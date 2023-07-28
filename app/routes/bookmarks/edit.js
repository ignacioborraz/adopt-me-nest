import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        Ember.Logger.info('update called')
        return this.get('store').findRecord('bookmark',params.bookmark_id)
    }
});
