import Ember from 'ember';

const UserListComponent = Ember.Component.extend({
    imgClass: "avatar",
    click() {
        Ember.Logger.info("user-list was cliecked")
        return false
    }
});

UserListComponent.reopenClass({
    positionalParams: ['avatarUrl','email']
})

export default UserListComponent