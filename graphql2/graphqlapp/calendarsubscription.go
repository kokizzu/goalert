package graphqlapp

import (
	"context"
	"database/sql"
	"github.com/target/goalert/calendarsubscription"
	"github.com/target/goalert/graphql2"
)

func (q *Query) CalendarSubscription(ctx context.Context, id string) (*calendarsubscription.CalendarSubscription, error) {
	return q.CalendarSubscriptionStore.FindOne(ctx, id)
}

// todo: return url instead of bool once endpoint has been created
func (m *Mutation) CreateCalendarSubscription(ctx context.Context, input graphql2.CreateCalendarSubscriptionInput) (res bool, err error) {
	err = withContextTx(ctx, m.DB, func(ctx context.Context, tx *sql.Tx) error {
		cs := &calendarsubscription.CalendarSubscription{
			Name: input.Name,
		}

		res, err = m.CalendarSubscriptionStore.CreateSubscriptionTx(ctx, tx, cs)
		if err != nil {
			return err
		}

		// todo: gen url for user

		return err
	})

	return res, err
}

func (m *Mutation) UpdateCalendarSubscription(ctx context.Context, input graphql2.UpdateCalendarSubscriptionInput) (bool, error) {
	err := withContextTx(ctx, m.DB, func(ctx context.Context, tx *sql.Tx) error {
		cs := &calendarsubscription.CalendarSubscription{
			ID: input.ID,
			Name: input.Name,
		}

		err := m.CalendarSubscriptionStore.UpdateSubscriptionTx(ctx, tx, cs)
		if err != nil {
			return err
		}

		return err
	})

	return err == nil, err
}
