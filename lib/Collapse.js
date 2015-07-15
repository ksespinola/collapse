'use strict';

var _require = require('react');

var PropTypes = _require.PropTypes;
var createClass = _require.createClass;
var Children = _require.Children;

var CollapsePanel = require('./Panel.js');

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

module.exports = createClass({

  displayName: 'Collapse',

  propTypes: {
    prefixCls: PropTypes.string,
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onChange: PropTypes.func,
    accordion: PropTypes.bool,
    maxHeight: PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-collapse',
      onChange: function onChange() {},
      accordion: false
    };
  },

  getInitialState: function getInitialState() {
    var _props = this.props;
    var defaultActiveKey = _props.defaultActiveKey;
    var activeKey = _props.activeKey;
    var accordion = _props.accordion;

    // If is not accordion mode, then, defaultActiveKey should be an array
    if (!accordion) {
      defaultActiveKey = defaultActiveKey || [];
    }

    return {
      activeKey: activeKey || defaultActiveKey
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: nextProps.activeKey
      });
    }
  },

  handleClickItem: function handleClickItem(key) {
    var _this = this;

    return function () {
      if (_this.props.accordion) {
        _this.setState({
          activeKey: key
        });
      } else {

        var activeKey = _this._getActivityKey();
        var index = activeKey.indexOf(key);
        var isActive = index > -1;
        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }

        _this.setState({ activeKey: activeKey });
      }
      _this.props.onChange(key);
    };
  },

  _getActivityKey: function _getActivityKey() {
    var activeKey = this.state.activeKey;
    var accordion = this.props.accordion;

    if (accordion && Array.isArray(activeKey)) {
      activeKey = activeKey[0];
    }

    if (!accordion && !Array.isArray(activeKey)) {
      activeKey = activeKey ? [activeKey] : [];
    }
    return activeKey;
  },

  getItems: function getItems() {
    var _this2 = this;

    var activeKey = this._getActivityKey();
    var _props2 = this.props;
    var prefixCls = _props2.prefixCls;
    var accordion = _props2.accordion;

    return Children.map(this.props.children, function (child, i) {
      // If there is no key provide, use the panel order as default key
      var key = child.key || i;
      var header = child.props.header;
      var maxHeight = child.props.maxHeight;
      var isActive = false;
      if (accordion) {
        isActive = !activeKey ? !i : activeKey === key;
      } else {
        isActive = activeKey.indexOf(key) > -1;
      }

      var props = {
        key: key,
        header: header,
        isActive: isActive,
        prefixCls: prefixCls,
        maxHeight: maxHeight,
        children: child.props.children,
        onItemClick: _this2.handleClickItem(key).bind(_this2)
      };

      return React.createElement(CollapsePanel, props);
    });
  },

  render: function render() {
    var prefixCls = this.props.prefixCls;
    return React.createElement(
      'div',
      { className: prefixCls },
      this.getItems()
    );
  }
});