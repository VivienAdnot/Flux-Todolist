var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');

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
      list: todoStore.getList()
    })
  },
  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <AddItem add={this.handleAddItem}/>
          <List
            items={this.state.list}
            remove={this.handleRemoveItem}
            update={this.handleUpdateItem}
            toggle={this.handleToggleItem}
          />
          <h5>{this.state.list.length} item(s) left</h5>
          <button onClick={this.handleCompleteOrCancelAllItems}>Complete or Cancel All Items</button>
        </div>
      </div>
    )
  }
});

module.exports = ListContainer;