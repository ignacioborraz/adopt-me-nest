import Ember from 'ember';

export default Ember.Component.extend({
    bookmark: null,
    router: Ember.inject.service('-routing'),

    actions: {
        save(bookmark) {
            Ember.Logger.info('save called')
            bookmark.save()
                .then(value=> {
                    Ember.Logger.info(value)
                    this.get('router').transitionTo('bookmarks')
                })
                .catch(err=> Ember.Logger.info(err))
        },
        cancelAnimationFrame() {
            Ember.Logger.info('cancel called')
        },
        delete(bookmark) {
            bookmark.destroyRecord()
            this.get('router').transitionTo('bookmarks')
        }
    }
});
