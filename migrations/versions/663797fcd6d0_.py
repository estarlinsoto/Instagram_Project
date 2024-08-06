"""empty message

Revision ID: 663797fcd6d0
Revises: 60906b5f33f6
Create Date: 2024-08-05 23:14:51.118496

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '663797fcd6d0'
down_revision = '60906b5f33f6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_constraint('post_location_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.create_unique_constraint('post_location_key', ['location'])

    # ### end Alembic commands ###