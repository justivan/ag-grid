"""empty message

Revision ID: cdedda0136d4
Revises: 
Create Date: 2022-09-22 14:04:42.501331

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cdedda0136d4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('operator',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('short_name', sa.String(length=10), nullable=False),
    sa.Column('category', sa.String(length=2), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('purchase_mgr',
    sa.Column('id', sa.String(length=2), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('status',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hotel',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('country', sa.String(length=2), nullable=False),
    sa.Column('state', sa.String(length=20), nullable=False),
    sa.Column('purc_mgr_id', sa.String(length=2), nullable=True),
    sa.ForeignKeyConstraint(['purc_mgr_id'], ['purchase_mgr.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reserv',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ref_id', sa.Integer(), nullable=False),
    sa.Column('res_id', sa.Integer(), nullable=False),
    sa.Column('opr_code', sa.String(length=10), nullable=False),
    sa.Column('bkg_ref', sa.String(length=100), nullable=False),
    sa.Column('guest_name', sa.String(length=100), nullable=False),
    sa.Column('import_date', sa.DateTime(), nullable=False),
    sa.Column('sales_date', sa.DateTime(), nullable=False),
    sa.Column('in_date', sa.DateTime(), nullable=False),
    sa.Column('out_date', sa.DateTime(), nullable=False),
    sa.Column('room', sa.String(length=100), nullable=False),
    sa.Column('meal', sa.String(length=24), nullable=False),
    sa.Column('days', sa.SmallInteger(), nullable=False),
    sa.Column('adult', sa.SmallInteger(), nullable=False),
    sa.Column('child', sa.SmallInteger(), nullable=False),
    sa.Column('purchase', sa.Float(), nullable=False),
    sa.Column('sales', sa.Float(), nullable=False),
    sa.Column('opr_cost', sa.Float(), server_default=sa.text('0'), nullable=False),
    sa.Column('statu4', sa.String(length=10), nullable=False),
    sa.Column('gwg_p_id', sa.Integer(), nullable=False),
    sa.Column('gwg_p_name', sa.String(length=225), nullable=False),
    sa.Column('gwg_p_code', sa.String(length=225), nullable=False),
    sa.Column('gwg_s_id', sa.Integer(), nullable=False),
    sa.Column('gwg_s_name', sa.String(length=225), nullable=False),
    sa.Column('gwg_s_code', sa.String(length=225), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text("TIMEZONE('utc', CURRENT_TIMESTAMP)"), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text("TIMEZONE('utc', CURRENT_TIMESTAMP)"), nullable=True),
    sa.Column('status_id', sa.Integer(), server_default=sa.text('1'), nullable=False),
    sa.Column('operator_id', sa.Integer(), nullable=False),
    sa.Column('hotel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['hotel_id'], ['hotel.id'], ),
    sa.ForeignKeyConstraint(['operator_id'], ['operator.id'], ),
    sa.ForeignKeyConstraint(['status_id'], ['status.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_reserv_bkg_ref'), 'reserv', ['bkg_ref'], unique=False)
    op.create_index(op.f('ix_reserv_import_date'), 'reserv', ['import_date'], unique=False)
    op.create_index(op.f('ix_reserv_in_date'), 'reserv', ['in_date'], unique=False)
    op.create_index(op.f('ix_reserv_out_date'), 'reserv', ['out_date'], unique=False)
    op.create_index(op.f('ix_reserv_ref_id'), 'reserv', ['ref_id'], unique=True)
    op.create_index(op.f('ix_reserv_res_id'), 'reserv', ['res_id'], unique=False)
    op.create_index(op.f('ix_reserv_sales_date'), 'reserv', ['sales_date'], unique=False)
    op.create_table('reserv_rate',
    sa.Column('reserv_id', sa.Integer(), nullable=False),
    sa.Column('e_date', sa.DateTime(), nullable=False),
    sa.Column('base_rate', sa.Float(), nullable=True),
    sa.Column('adult_supp', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('child_supp', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('adult_meal', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('child_meal', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('peak_supp', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('extras', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('base_rate_disc', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('adult_supp_disc', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('child_supp_disc', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('meal_disc', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('peak_supp_disc', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('extras_disc', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('mark_up', sa.Float(), server_default=sa.text('0'), nullable=True),
    sa.Column('gwg_p_id', sa.Integer(), server_default=sa.text('0'), nullable=True),
    sa.Column('gwg_p_code', sa.String(length=225), nullable=True),
    sa.Column('gwg_s_id', sa.Integer(), server_default=sa.text('0'), nullable=False),
    sa.Column('gwg_s_code', sa.String(length=225), nullable=True),
    sa.ForeignKeyConstraint(['reserv_id'], ['reserv.id'], ),
    sa.PrimaryKeyConstraint('reserv_id', 'e_date')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reserv_rate')
    op.drop_index(op.f('ix_reserv_sales_date'), table_name='reserv')
    op.drop_index(op.f('ix_reserv_res_id'), table_name='reserv')
    op.drop_index(op.f('ix_reserv_ref_id'), table_name='reserv')
    op.drop_index(op.f('ix_reserv_out_date'), table_name='reserv')
    op.drop_index(op.f('ix_reserv_in_date'), table_name='reserv')
    op.drop_index(op.f('ix_reserv_import_date'), table_name='reserv')
    op.drop_index(op.f('ix_reserv_bkg_ref'), table_name='reserv')
    op.drop_table('reserv')
    op.drop_table('hotel')
    op.drop_table('status')
    op.drop_table('purchase_mgr')
    op.drop_table('operator')
    # ### end Alembic commands ###
