return (
  <div className="layout-component">
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
          <div className="col-3">
              <div className="row">
                  <div className="col-12">
                      <div className="card-chart full-height card_magin">
                          {/* chart */}
                          <Chart
                              options={themeReducer === 'theme-mode-dark' ? {
                                  ...chartOptions.options,
                                  theme: { mode: 'dark'}
                              } : {
                                  ...chartOptions.options,
                                  theme: { mode: 'light'}
                              }}
                              series={chartOptions.series}
                              type='area'
                              height='100%'
                          />
                      </div>
                  </div>
                  <div className="col-12">
                      <div className="card card_magin">
                          <div className="card__header">
                              <h3>top customer</h3>
                          </div>
                          <div className="card__header">
                              
                          </div>
                          <div className="card__footer">
                              <Link to='/'>view all</Link>
                          </div>
                      </div>
                  </div>
              </div>               
          </div>
         
          <div className="col-8">
              <div className="card table-job">
                  <div className="card__header">
                      <h3>latest orders</h3>
                  </div>
                  <div className="card__body">
                      <Table
                          limit='4'
                          headData={latestOrders.header}
                          renderHead={(item, index) => renderOrderHead(item, index)}
                          bodyData={latestOrders.body}
                          renderBody={(item, index) => renderOrderBody(item, index)}
                      />
                  </div>
                  {/* <div className="card__footer">
                      <Link to='/'>view all</Link>
                  </div> */}
              </div>
          </div>

          <div className="col-11-2">
              <div className="row">
                  {
                      StatusCards.map((item, index) => (
                          <div className="col-2-2">
                              <StatusCard
                                  icon={item.icon}
                                  count={item.count}
                                  title={item.title}
                              />
                          </div>
                      ))
                  }
              </div>               
          </div>
      </div>
  </div>
)

//button loading....

// const {  Button, Space  } = antd;
// const {  PoweroffOutlined  } = icons;

// class App extends React.Component {
//   state = {
//     loadings: [],
//   };

//   enterLoading = index => {
//     this.setState(({ loadings }) => {
//       const newLoadings = [...loadings];
//       newLoadings[index] = true;

//       return {
//         loadings: newLoadings,
//       };
//     });
//     setTimeout(() => {
//       this.setState(({ loadings }) => {
//         const newLoadings = [...loadings];
//         newLoadings[index] = false;

//         return {
//           loadings: newLoadings,
//         };
//       });
//     }, 6000);
//   };

//   render() {
//     const { loadings } = this.state;
//     return (
//       <>
//         <Space style={{ width: '100%' }}>
//           <Button type="primary" loading>
//             Loading
//           </Button>
//           <Button type="primary" size="small" loading>
//             Loading
//           </Button>
//           <Button type="primary" icon={<PoweroffOutlined />} loading />
//         </Space>

//         <Space style={{ width: '100%' }}>
//           <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
//             Click me!
//           </Button>
//           <Button
//             type="primary"
//             icon={<PoweroffOutlined />}
//             loading={loadings[1]}
//             onClick={() => this.enterLoading(1)}
//           >
//             Click me!
//           </Button>
//           <Button
//             type="primary"
//             icon={<PoweroffOutlined />}
//             loading={loadings[2]}
//             onClick={() => this.enterLoading(2)}
//           />
//         </Space>
//       </>
//     );
//   }
// }

// ReactDOM.render(<App />, mountNode);