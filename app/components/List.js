var React = require('react');

var List = React.createClass({

  handleUpdate: (index) => {
    if (!index) return;

    var ulItemsContainer = document.getElementById("itemsContainer");
    console.log("ulItemsContainer val", ulItemsContainer);

    var nodes = document.getElementsByClassName("list-group-item");

    if (nodes.length) {
      console.log("handleUpdate", nodes.length, index, nodes[index]);
      var newValue = document.getElementsByClassName("list-group-item")[index].value;

    } else {
      console.log("handleUpdate nodes nothing") ;

    }

    // this.props.update({
    //   index,
    //   value: newValue
    // });

  },

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
        paddingLeft: 20,
        fontSize: 17
      }
    };

    var listItems = this.props.items.map(function(item, index){
      return (
        <li key={index} className="list-group-item" style={styles.listGroup}>
          <span
            className="glyphicon glyphicon-remove"
            style={styles.removeItem}
            onClick={this.props.remove.bind(null, index)}
          >
          </span>

          <input
            type="text"
            ref="updateItem"
            className="form-control"
            value={item}
//            onKeyDown={this.handleUpdate(index)}
          />

          <span
            className="glyphicon glyphicon-edit"
            style={styles.editItem}
            onClick={() => this.handleUpdate(index)}
          >
          </span>

        </li>
      )
    }.bind(this));
    return (
      <ul id="itemsContainer" style={styles.uList}>
        {listItems}
      </ul>
    )
  }
});

module.exports = List;