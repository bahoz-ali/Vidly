import React from "react";
import _ from "lodash";
class TableBody extends React.Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={this.randomId()}>
            {columns.map((column) => (
              <td key={this.randomId()}>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
  count = 0;
  randomId = () => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return uint32.toString(16);
  };
}

export default TableBody;
