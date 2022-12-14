"""added hotel mapping

Revision ID: 17e7d635da46
Revises: cdedda0136d4
Create Date: 2022-09-22 15:46:53.289905

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '17e7d635da46'
down_revision = 'cdedda0136d4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('hotel_mapping',
    sa.Column('mpae_id', sa.Integer(), nullable=False),
    sa.Column('gwg_id', sa.Integer(), nullable=False),
    sa.Column('gwg_hotel_name', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('mpae_id', 'gwg_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('hotel_mapping')
    # ### end Alembic commands ###
