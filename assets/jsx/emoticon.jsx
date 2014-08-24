/** @jsx React.DOM */
var Emoticon = React.createClass({
  render: function() {
    return (
      <div className="emoticon">
        <img src={this.props.data.url} />
        <p>
          ({this.props.data.shortcut})
        </p>
      </div>
    );
  }
});

