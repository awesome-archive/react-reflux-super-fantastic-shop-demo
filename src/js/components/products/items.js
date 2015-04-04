'use strict';

let React = require('react');
let Reflux = require('reflux');

let store = require('../../stores/product-store');
let actions = require('../../actions/app-actions');

let Item = require('./item.js');

let Items = React.createClass({

  mixins: [Reflux.connect(store), Reflux.ListenerMixin],

  refreshPage() {
    this.setState({
      productType: this.props.type
    });
    actions.pageChange(this.props.type);
  },

  componentDidMount: function() {
    this.listenTo(store, this.refreshPage);
    actions.loadPage(this.props.type, true);
  },

  render: function() {
    var items = this.state.products[this.props.type].map((item,i) => {
        item.type = this.state.productType;
        return <Item key={item.id} item={item} index={i} />;
      });
      return (
        <div>
          <ul component="ul" className="pure-g appItems list-reset">
            {items}
          </ul>
        </div>
     );
  }
});

module.exports = Items;
