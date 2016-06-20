'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    customClass: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onSearch: React.PropTypes.func,
    throttle: React.PropTypes.number,
    isFocus: React.PropTypes.bool,
    text: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      customClass: '',
      placeholder: 'search...',
      throttle: 200,
      isFocus: true
    };
  },

  getInitialState: function () {
    return {
      text: this.props.text || ''
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.isFocus) {
      this._setFocus();
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.isFocus) {
      this._setFocus();
    }
    if (nextProps.text !== this.state.text) {
      this.setState({
        text: nextProps.text
      });
    }
  },

  render: function render() {
    var props = this.props;

    return React.createElement(
      'div',
      { className: "search-wrap " + props.customClass },
      React.createElement(
        'form',
        {
          className: 'search-form',
          onSubmit: this._onSubmit },
        React.createElement('input', {
          ref: 'searchInput',
          type: 'text',
          autoComplete: 'off',
          value: this.state.text,
          onChange: this._onInputChange,
          className: 'search-input',
          placeholder: props.placeholder,
          onKeyDown: this._onKeyDown })
      )
    );
  },

  _timeoutId: null,

  _onKeyDown: function _onKeyDown(e) {
    if (this._timeoutId) clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout((function () {
      this._goSearch(e);
    }).bind(this), this.props.throttle);
  },

  _onSubmit: function _onSubmit(e) {
    this._goSearch(e);
    e.preventDefault();
    return false;
  },

  _goSearch: function _goSearch(e) {
    var inputEle, keyword;
    inputEle = ReactDOM.findDOMNode(this.refs.searchInput);
    keyword = inputEle.value;
    if (this.props.onSearch) {
      this.props.onSearch(keyword, e);
    }
  },

  _setFocus: function _setFocus() {
    var inputEle;
    inputEle = ReactDOM.findDOMNode(this.refs.searchInput);
    inputEle.focus();
  },

  _onInputChange: function(e) {
    var inputEle;
    inputEle = ReactDOM.findDOMNode(this.refs.searchInput);
    this.setState({
      text: inputEle.value
    });
  }

});

