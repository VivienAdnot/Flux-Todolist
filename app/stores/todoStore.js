var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: []
};

var addItem = function(item){
  _store.list.push({
    title: item,
    completed: false
  });
};

var removeItem = function(index){
  _store.list.splice(index, 1);
}

var updateItem = (index) => {
  _store.list[index].title = "updated";
};

var toggleItem = (index) => {
  _store.list[index].completed = !_store.list[index].completed;
}

var todoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList: function(){
    return _store.list;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.UPDATE_ITEM:
      updateItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.TOGGLE_ITEM:
      toggleItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = todoStore;
