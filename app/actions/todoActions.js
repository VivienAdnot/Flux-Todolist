var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var todoActions = {
  addItem: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },
  removeItem: function(index){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    })
  },
  updateItem: (index) => AppDispatcher.handleAction({
    actionType: appConstants.UPDATE_ITEM,
    data: index
  }),
  toggleItem: (index) => AppDispatcher.handleAction({
    actionType: appConstants.TOGGLE_ITEM,
    data: index
  }),
};

module.exports = todoActions;
