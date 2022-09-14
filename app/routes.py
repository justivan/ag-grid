from flask import render_template, jsonify, request, abort
from app import app, db
from .models import Reserv, Status


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/api/data', methods=['GET', 'POST'])
def data():
    query = db.session.query(Reserv)

    # filter
    filter_model = request.get_json()['filterModel']
    if filter_model:
        filter = build_filter(filter_model)
        query = query.filter(db.and_(*filter))

    total_rows = query.count()

    # sorting
    sort = request.get_json()['sortModel']
    if sort:
        order = []
        for index in range(len(sort)):
            order_by = sort[index]['sort']
            field = sort[index]['colId']
            col = getattr(Reserv, field)
            if order_by == 'desc':
                col = col.desc()
            order.append(col)

        if order:
            query = query.order_by(*order)

    else:
        query = query.order_by(
            Reserv.hotel_name, Reserv.in_date, Reserv.ref_id)

    # infinite scroll
    if 'startRow' in request.get_json():
        start = request.get_json()['startRow']
        length = request.get_json()['endRow']

        query = query.limit(length - start).offset(start)

    return jsonify({
        'data': [bkg.to_dict for bkg in query],
        'total_rows': total_rows
    })

@app.route('/api/data/<int:id>', methods=['GET', 'POST'])
def api_rate(id):
    return {}, 200

@app.route('/api/status', methods=['GET', 'POST'])
def get_status():
    query = Status.query.order_by(Status.id)

    return [status.to_dict for status in query]


@app.route('/api/hotel', methods=['GET', 'POST'])
def get_hotel():

    query = Reserv.query.with_entities(
        Reserv.hotel_name).distinct().order_by(Reserv.hotel_name)

    data = []
    for row in query:
        data.append({
            'value': row.hotel_name,
            'label': row.hotel_name
        })

    return data


@app.route('/api/filter', methods=['GET', 'POST'])
def load_filter():

    attr = request.get_json()['attr']
    filter_model = request.get_json()['filterModel']
    col = getattr(Reserv, attr)

    query = Reserv.query.with_entities(col).distinct().order_by(col)

    if filter_model:
        filter = build_filter(filter_model)
        query = query.filter(db.and_(*filter))

    data = []
    for row in query:
        data.append(row[0])

    return data


@app.route('/api/update', methods=['POST'])
def update():
    data = request.get_json()
    if 'id' not in data:
        abort(400)
    reserv = Reserv.query.get(data['id'])
    for field in Reserv.__table__.columns.keys():
        if field in data and field != 'id':
            setattr(reserv, field, data[field])
    db.session.commit()
    return {}, 200


def build_filter(filter_model):
    filter = []
    for attr, item in filter_model.items():
        col = getattr(Reserv, attr)

        if item['filterType'] == 'date':
            if item['type'] == 'inRange':
                col = col.between(item['dateFrom'], item['dateTo'])
            elif item['type'] == 'lessThan':
                col = col.__lt__(item['dateFrom'])
            elif item['type'] == 'greaterThan':
                col = col.__gt__(item['dateFrom'])
            else:
                col = col.__eq__(item['dateFrom'])
        elif item['filterType'] == 'number':
            if item['type'] == 'notEqual':
                col = col.__ne__(item['filter'])
            elif item['type'] == 'lessThan':
                col = col.__lt__(item['filter'])
            elif item['type'] == 'lessThanOrEqual':
                col = col.__l3__(item['filter'])
            elif item['type'] == 'greaterThan':
                col = col.__gt__(item['filter'])
            elif item['type'] == 'greaterThanOrEqual':
                col = col.__ge__(item['filter'])
            elif item['type'] == 'inRange':
                col = col.between(item['filter'], item['filterTo'])
            else:
                col = col.__eq__(item['filter'])
        else:
            col = col.in_(item['values'])

        filter.append(col)

    return filter


@app.route('/api/choices/status', methods=['GET', 'POST'])
def get_choices_status():
    query = Status.query.order_by(Status.id)

    selected = request.get_json()['selected']

    data = []
    for row in query:
        data.append({
            'value': row.id,
            'label': row.name,
            'selected': True if int(selected) == row.id else False
        })

    return data
