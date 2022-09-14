from sqlalchemy.sql import expression
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.types import DateTime
from sqlalchemy import text
from decimal import *
from app import db


class utcnow(expression.FunctionElement):
    type = DateTime()
    inherit_cache = True


@compiles(utcnow, 'postgresql')
def pg_utcnow(element, compiler, **kw):
    return "TIMEZONE('utc', CURRENT_TIMESTAMP)"


class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ref_id = db.Column(db.Integer, index=True, nullable=False)
    res_id = db.Column(db.Integer, index=True, nullable=False)
    hotel_name = db.Column(db.String(100), index=True, nullable=False)
    opr_name = db.Column(db.String(10), index=True, nullable=False)
    opr_code = db.Column(db.String(10), nullable=False)
    bkg_ref = db.Column(db.String(100), index=True, nullable=False)
    guest_name = db.Column(db.String(100), nullable=False)
    import_date = db.Column(db.DateTime, index=True, nullable=False)
    sales_date = db.Column(db.DateTime, index=True, nullable=False)
    in_date = db.Column(db.DateTime, index=True, nullable=False)
    out_date = db.Column(db.DateTime, index=True, nullable=False)
    room = db.Column(db.String(100), nullable=False)
    meal = db.Column(db.String(24), nullable=False)
    days = db.Column(db.SmallInteger, nullable=False)
    adult = db.Column(db.SmallInteger, nullable=False)
    child = db.Column(db.SmallInteger, nullable=False)
    purchase = db.Column(db.Float(), nullable=False)
    sales = db.Column(db.Float(), nullable=False)
    opr_cost = db.Column(db.Float(), nullable=False, server_default=text("0"))
    statu4 = db.Column(db.String(10), nullable=False)
    gwg_p_id = db.Column(db.Integer, nullable=False)
    gwg_p_name = db.Column(db.String(225), nullable=False)
    gwg_p_code = db.Column(db.String(225), nullable=False)
    gwg_s_id = db.Column(db.Integer, nullable=False)
    gwg_s_name = db.Column(db.String(225), nullable=False)
    gwg_s_code = db.Column(db.String(225), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey(
        'status.id'), nullable=False, server_default=text("1"))
    created_at = db.Column(db.DateTime, server_default=utcnow())
    updated_at = db.Column(
        db.DateTime, server_default=utcnow(), onupdate=utcnow())
    # rates = db.relationship('DailyRate', backref='booking')

    @property
    def to_dict(self):
        dt_fmt = '%d/%m/%Y'
        getcontext().prec = 2

        def custom_div(numerator, denominator):
            if denominator == 0:
                return 0
            return numerator/denominator * 100

        margin = custom_div(self.sales - self.purchase, self.purchase)

        return {
            'id': self.id,
            'ref_id': self.ref_id,
            'res_id': self.res_id,
            'hotel_name': self.hotel_name,
            'opr_name': self.opr_name,
            'opr_code': self.opr_code,
            'bkg_ref': self.bkg_ref,
            'guest_name': self.guest_name,
            'import_date': self.import_date,
            'sales_date': self.sales_date,
            'in_date': self.in_date,
            'out_date': self.out_date,
            'room': self.room,
            'meal': self.meal,
            'days': self.days,
            'adult': self.adult,
            'child': self.child,
            'purchase': self.purchase,
            'sales': self.sales,
            'opr_cost': self.opr_cost,
            'margin': round(margin, 2),
            'statu4': self.statu4,
            'gwg_p_id': self.gwg_p_id,
            'gwg_p_name': self.gwg_p_name,
            'gwg_p_code': self.gwg_p_code,
            'gwg_s_id': self.gwg_s_id,
            'gwg_s_name': self.gwg_s_name,
            'gwg_s_code': self.gwg_s_code,
            'status': self.status.name,
            'status_id': self.status_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


class Status(db.Model):
    __tablename__ = 'status'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    bookings = db.relationship('Booking', backref='status', lazy=True)

    @property
    def to_dict(self):
        return {
            'value': self.id,
            'label': self.name
        }
