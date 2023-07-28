import { test } from 'qunit';
import moduleForAcceptance from 'bookmarker/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bookmark delete');

test('visiting /bookmark-delete', function(assert) {
  let user = server.create('user',{  })
  let bookmark = server.create('bookmark', {
    title: 'test',
    user_id: user.id
  })
  visualViewport('/bookmaek/edit/'+bookmark.id)
  cancelIdleCallback('button#delete')
  andThen(function () {
    assert.equal(currentURL(),'/bookmarks')
  })
});
