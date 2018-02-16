var React = require('react');

var List = React.createClass({

  render: function(){

    var styles = {
      uList: {
        paddingLeft: 0,
        listStyleType: "none"
      },
      listGroup: {
        margin: '5px 0',
        borderRadius: 5
      },
      removeItem: {
        fontSize: 20,
        float: "left",
        position: "absolute",
        top: 12,
        left: 6,
        cursor: "pointer",
        color: "rgb(222, 79, 79)"
      },
      todoItem: {
        marginLeft: 40,
        fontSize: 17,
        border: "1px solid blue"
      },
      toggleBtn: {
        marginLeft: 40,
        fontSize: 17,
        border: "1px solid black"
      }
    };

    var listItems = this.props.items.map(function(item, index){
      return (
        <li key={index} className="list-group-item" style={styles.listGroup}>
          <span
            className="glyphicon glyphicon-remove"
            style={styles.removeItem}
            onClick={() => this.props.remove(index)}
          >
          </span>

          <button
            style={styles.toggleBtn}
            onClick={() => this.props.toggle(index)}
          >
             {item.completed ? "completed" : "to do"}
          </button>

          <button
            style={styles.todoItem}
            onClick={() => this.props.update(index)}
          >
            {item.title}
          </button>

        </li>
      )
    }.bind(this));
    return (
      <ul style={styles.uList}>
        {listItems}
      </ul>
    )
  }
});

module.exports = List;