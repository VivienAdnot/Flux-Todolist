var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');

var showItemStrategies = {
  ALL: "ALL",
  ACTIVE_ONLY: "ACTIVE_ONLY",
  COMPLETED_ONLY: "COMPLETED_ONLY"
};

var ListContainer = React.createClass({
  getInitialState: function(){
    return {
      list: todoStore.getList(),
      showItemStrategy: showItemStrategies.ALL
    }
  },

  componentDidMount: function(){
    todoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    todoStore.removeChangeListener(this._onChange);
  },

  getActiveItemsCount: function() {
    return this.state.list.filter(item => item.completed == false).length;
  },

  handleAddItem: function(newItem){
    todoActions.addItem(newItem);
  },

  handleRemoveItem: function(index){
    todoActions.removeItem(index);
  },

  handleUpdateItem: (index) => {
    todoActions.updateItem(index);
  },

  handleToggleItem: (index) => {
    todoActions.toggleItem(index);
  },

  handleCompleteOrCancelAllItems: () => {
    todoActions.completeOrCancelAllItems();
  },

  _onChange: function(){
    this.setState({
      list: this.filterItemsByShowStrategy(todoStore.getList(), this.state.showItemStrategy),
      showItemStrategy: this.state.showItemStrategy
    })
  },

  handleUpdateShowItemStrategy(newStrategy) {
    this.setState({
      list: this.filterItemsByShowStrategy(todoStore.getList(), newStrategy),
      showItemStrategy: newStrategy
    })
  },

  filterItemsByShowStrategy: function(items, strategy) {
    switch(strategy) {
      case showItemStrategies.ALL:
        return items;
      case showItemStrategies.ACTIVE_ONLY:
        return items.filter(item => item.completed == false);
      case showItemStrategies.COMPLETED_ONLY:
        return items.filter(item => item.completed == true);
      default:
        throw new Error('unknown showItemStrategy: ' + strategy);
    }
  },

  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <button onClick={this.handleCompleteOrCancelAllItems}>Complete or Cancel All Items</button>

          <AddItem add={this.handleAddItem}/>

          <List
            items={this.state.list}
            remove={this.handleRemoveItem}
            update={this.handleUpdateItem}
            toggle={this.handleToggleItem}
          />

          <div>
            <h5>{this.getActiveItemsCount()} item(s) left</h5>
            <button onClick={() => this.handleUpdateShowItemStrategy(showItemStrategies.ALL)}>all</button>
            <button onClick={() => this.handleUpdateShowItemStrategy(showItemStrategies.ACTIVE_ONLY)}>active</button>
            <button onClick={() => this.handleUpdateShowItemStrategy(showItemStrategies.COMPLETED_ONLY)}>completed</button>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = ListContainer;