/** @jsx React.DOM */
var Emoticons = React.createClass({
  getInitialState: function() {
    return { emoticons: [] };
  },
  componentWillMount: function() {
    console.log("Starting loading emoticons");
    this.reloadEmoticons();
  },
  reloadEmoticons: function() {
    var _that = this;
    console.log("About to reload emoticons");
    reqwest({
      url: '/emoticons.json',
      type: 'json',
      success: function(resp) {
        _that.setState({ emoticons: resp });
      }
    });
    setTimeout(this.reloadEmoticons, 60000);
  },
  renderEmoticons: function() {
    return this.state.emoticons.map(function(emote) {
      return <Emoticon data={emote} />
    });
  },
  render: function() {
    return (
      <div>
        {this.renderEmoticons()}
      </div>
    );
  }
});
