"""empty message

Revision ID: 60906b5f33f6
Revises: cb4820f8a1de
Create Date: 2024-08-05 23:13:32.738049

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '60906b5f33f6'
down_revision = 'cb4820f8a1de'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_constraint('post_status_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.create_unique_constraint('post_status_key', ['status'])

    # ### end Alembic commands ###
