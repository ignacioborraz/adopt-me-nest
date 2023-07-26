import DS from 'ember-data'
import attr  from 'ember-data/attr'
import { hasMany } from 'ember-data/relationships'

export default DS.Model.extend({
  username: attr('string'),
  email: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),
  avatar: attr('string'),
  isAdmin: attr('boolean',{ defaultValue: false }),
  created: attr('date', { defaultValue() {return new Date()} }),
  bookmarks: hasMany('bookmark')
  //la relacion es 1 a n, el modelo es singular
});