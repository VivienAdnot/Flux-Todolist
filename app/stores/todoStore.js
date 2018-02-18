var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var showItemStrategies = require('../constants/showItemStrategies');

Array.prototype.filterItemsByShowStrategy = function(showItemStrategy) {
  switch(showItemStrategy) {
    case showItemStrategies.ALL:
      return this;
    case showItemStrategies.ACTIVE_ONLY:
      return this.filter(item => item.completed == false);
    case showItemStrategies.COMPLETED_ONLY:
      return this.filter(item => item.completed == true);
    default:
      throw new Error('unknown showItemStrategy: ' + showItemStrategy);
  }
}

var CHANGE_EVENT = 'change';

var _store = {
  list: [],
  showItemStrategy: showItemStrategies.ALL
};

var addItem = function(item){
  _store.list.push({
    title: item,
    completed: false
  });
};

var removeItem = function(index){
  _store.list.splice(index, 1);
};

var updateItem = (index) => {
  _store.list[index].title = "updated";
};

var toggleItem = (index) => {
  _store.list[index].completed = !_store.list[index].completed;
};

var completeOrCancelAllItems = () => {
  if (_store.list.every(item => item.completed == true)) {
    _store.list.forEach(item => item.completed = false);
  } else {
    _store.list.forEach(item => item.completed = true);
  }
};

var updateShowItemStrategy = (strategy) => {
  //todo handle unknown strategy

  _store.showItemStrategy = strategy;
};

var todoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList: function(){
    return _store.list.filterItemsByShowStrategy(_store.showItemStrategy);
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch (action.actionType) {

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

    case appConstants.COMPLETE_OR_CANCEL_ALL_ITEMS:
      completeOrCancelAllItems();
      todoStore.emit(CHANGE_EVENT);
      break;

    case appConstants.UPDATE_SHOW_ITEM_STRATEGY:
      updateShowItemStrategy(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
});

module.exports = todoStore;
