import React from 'react';
import {
  AutoSizer,
  PlatformStateContext,
  NerdletStateContext,
  HeadingText,
  LineChart,
  BillboardChart,
  AreaChart,
  BarChart,
  StackedBarChart,
  PieChart,
  SparklineChart,
  HeatmapChart,
  HistogramChart,
  JsonChart,
  TableChart,
  FunnelChart,
  ScatterChart,
  platform
} from 'nr1';
import Select from 'react-select';

const MINUTE = 60000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

const timeRangeToNrql = timeRange => {
  if (!timeRange || Object.keys(timeRange).length === 0) {
    return 'SINCE 30 minutes ago';
  }

  if (timeRange.beginTime && timeRange.endTime) {
    return `SINCE ${timeRange.beginTime} UNTIL ${timeRange.endTime}`;
  } else if (timeRange.begin_time && timeRange.end_time) {
    return `SINCE ${timeRange.begin_time} UNTIL ${timeRange.end_time}`;
  } else if (timeRange.duration <= HOUR) {
    return `SINCE ${timeRange.duration / MINUTE} MINUTES AGO`;
  } else if (timeRange.duration <= DAY) {
    return `SINCE ${timeRange.duration / HOUR} HOURS AGO`;
  } else {
    return `SINCE ${timeRange.duration / DAY} DAYS AGO`;
  }
};

export default class CustomModalNerdlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: null };
  }

  renderChart = (accountId, chartType, query, height, width, time) => {
    const queryWithTime = `${query} ${timeRangeToNrql(time?.value)}`;
    switch (chartType) {
      case 'area': {
        return (
          <AreaChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'bar': {
        return (
          <BarChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'billboard': {
        return (
          <BillboardChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'funnel': {
        return (
          <FunnelChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'heatmap': {
        return (
          <HeatmapChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'histogram': {
        return (
          <HistogramChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'json': {
        return (
          <JsonChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'line': {
        return (
          <LineChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'pie': {
        return (
          <PieChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'scatter': {
        return (
          <ScatterChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'sparkline': {
        return (
          <SparklineChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'stackedbar': {
        return (
          <StackedBarChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      case 'table': {
        return (
          <TableChart
            accountId={accountId}
            query={queryWithTime}
            style={{ height, width }}
          />
        );
      }
      default: {
        return 'Unsupported chart type';
      }
    }
  };

  render() {
    return (
      <AutoSizer>
        {({ width, height }) => (
          <PlatformStateContext.Consumer>
            {platformState => (
              <NerdletStateContext.Consumer>
                {nerdletState => {
                  const { queries, accountId } = nerdletState;
                  const { timeRange } = platformState;
                  const { time } = this.state;

                  const timeOptions = [
                    {
                      key: 'platform',
                      label: 'Platform time selection',
                      text: 'platform',
                      value: { ...timeRange }
                    },
                    {
                      key: '5',
                      label: '5 minutes',
                      text: '5',
                      value: {
                        begin_time: null,
                        duration: 5 * MINUTE,
                        end_time: null
                      }
                    },
                    {
                      key: '15',
                      label: '15 minutes',
                      text: '15',
                      value: {
                        begin_time: null,
                        duration: 15 * MINUTE,
                        end_time: null
                      }
                    },
                    {
                      key: '30',
                      label: '30 minutes',
                      text: '30',
                      value: {
                        begin_time: null,
                        duration: 30 * MINUTE,
                        end_time: null
                      }
                    },
                    {
                      key: '60',
                      label: '60 minutes',
                      text: '60',
                      value: {
                        begin_time: null,
                        duration: 60 * MINUTE,
                        end_time: null
                      }
                    },
                    {
                      key: '3',
                      label: '3 hours',
                      text: '3',
                      value: {
                        begin_time: null,
                        duration: 3 * HOUR,
                        end_time: null
                      }
                    },
                    {
                      key: '6',
                      label: '6 hours',
                      text: '6',
                      value: {
                        begin_time: null,
                        duration: 6 * HOUR,
                        end_time: null
                      }
                    },
                    {
                      key: '12',
                      label: '12 hours',
                      text: '12',
                      value: {
                        begin_time: null,
                        duration: 12 * HOUR,
                        end_time: null
                      }
                    },
                    {
                      key: '24',
                      label: '24 hours',
                      text: '24',
                      value: {
                        begin_time: null,
                        duration: 24 * HOUR,
                        end_time: null
                      }
                    },
                    {
                      key: '3d',
                      label: '3 days',
                      text: '3d',
                      value: {
                        begin_time: null,
                        duration: 3 * DAY,
                        end_time: null
                      }
                    },
                    {
                      key: '7d',
                      label: '7 days',
                      text: '7d',
                      value: {
                        begin_time: null,
                        duration: 7 * DAY,
                        end_time: null
                      }
                    }
                  ];
                  const selectedTime = time || timeOptions[0];
                  width = width * 0.95;

                  let widgetsPerCol = 3;
                  if (queries.length === 2) widgetsPerCol = 2;

                  let widgetsPerRow = 3;
                  if (queries.length === 2) widgetsPerRow = 2;

                  return (
                    <div style={{ padding: '10px' }}>
                      <div className="utility-bar">
                        <div className="react-select-input-group">
                          <label>Time Picker</label>
                          <Select
                            options={timeOptions}
                            placeholder="Select a time..."
                            isClearable
                            onChange={time => {
                              this.setState({ time }, () =>
                                platform.setUrlState({ timeRange: time?.value })
                              );
                            }}
                            value={selectedTime}
                            classNamePrefix="react-select"
                          />
                        </div>
                      </div>

                      {(queries || []).map((q, i) => {
                        const widgetHeight =
                          q.height && !isNaN(q.height)
                            ? `${q.height}px`
                            : undefined;
                        const widgetWidth =
                          q.width && !isNaN(q.width)
                            ? `${q.width}px`
                            : undefined;

                        return (
                          <div
                            key={i}
                            style={{
                              padding: '7px',
                              paddingBottom: '50px',
                              float: 'left',
                              height: widgetHeight || height / widgetsPerRow,
                              width: widgetWidth || width / widgetsPerCol
                            }}
                          >
                            {!q.hideTitle && (
                              <HeadingText
                                type={HeadingText.TYPE.HEADING_4}
                                style={{ paddingBottom: '5px' }}
                              >
                                {q.chartTitle}
                              </HeadingText>
                            )}
                            {this.renderChart(
                              accountId,
                              q.chartType,
                              q.query,
                              height,
                              width,
                              selectedTime
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </NerdletStateContext.Consumer>
            )}
          </PlatformStateContext.Consumer>
        )}
      </AutoSizer>
    );
  }
}
