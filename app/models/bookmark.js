import DS from 'ember-data'
import attr  from 'ember-data/attr'
import { belongsTo } from 'ember-data/relationships'

export default DS.Model.extend({
    link: attr('string'),
    title: attr('string'),
    about: attr('string'),
    public: attr('boolean'),
    created: attr('date',{ defaultValue() { return new Date()}}),
    user: belongsTo('user')
    //la relacion es en 1 a n, el modelo es singular
});
