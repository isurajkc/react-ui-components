var React = require('react');
var Components = require('react-ui-components');
var SearchInput = Components.SearchInput;
var List = require('react-dynamic-list');
var model = require('../model/index');

module.exports = React.createClass({
  getInitialState: function(){
    var groupedData = this._groupList(model.searchList);
    return {
      searchList: groupedData,
      adapter: {
        type: 'group'
      }
    };
  },

  render: function(){
    return (
      <div className="search-list">
        <SearchInput
          placeholder=""
          onSearch={this._onSearch} >
        </SearchInput>
        <List
          data={this.state.searchList}
          adapter={this.state.adapter}
          headDom={this._createHeadDom}
          rowDom={this._createRowDom} />
      </div>
    );
  },

  _onSearch: function(keyword, e){
    var _searchList;
    if(keyword){  
      _searchList = this._filterByKeyword(model.searchList, keyword);
      this.setState({
        searchList: _searchList,
        adapter: {
          type: 'plain'
        }
      });
    }else{
      this.setState({
        searchList: this._groupList(model.searchList),
        adapter: {
          type: 'group'
        }
      });
    }
  },

  _filterByKeyword: function(lists, keyword){
    var filteredData,
      itemName;
    keyword = keyword.toLowerCase();
    filteredData = _.filter(lists, function(item){
      itemName = item.name.toLowerCase();
      if(itemName.indexOf(keyword)){
        return true;
      }
    });
    return filteredData;
  },  

  /**
   * Sorted by first letter of key
   * @param  {[Array]} lists [description]
   * @param  {[String]} key   [description]
   * @return {[Array]}       [description]
   */
  _groupList: function(lists, key){
    var item, itemKey, firstLetter,
      groups = [],
      groupedData = [];
    for(var i=0,l=lists.length; i<l; i++){
      item = lists[i];
      itemKey = item[key];
      firstLetter = itemKey[0].toUpperCase();
      if(groups.indexOf(firstLetter) == -1){
        groupedData.push({
          name: firstLetter,
          items: [item]
        });
      }
    }
    return groupedData;
  },

  _createRowDom: function(position, data){
    var innerHTML = (data && data.name) || '';
    return (<div className=''>{innerHTML}</div>);
  },

  _createHeadDom: function(position, data){
    var innerHTML = data || '';
    return (<div className=''>{innerHTML}</div>);
  },
});

