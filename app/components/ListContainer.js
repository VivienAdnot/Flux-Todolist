var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');
var showItemStrategies = require('../constants/showItemStrategies');

var ListContainer = React.createClass({
  getInitialState: function(){
    return {
      list: todoStore.getList()
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
  handleUpdateShowItemStrategy: (strategy) => {
    todoActions.updateShowItemStrategy(strategy);
  },
  _onChange: function(){
    this.setState({
      list: todoStore.getList()
    })
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