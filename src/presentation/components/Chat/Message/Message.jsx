import { Card, Badge, Row, Col, Table } from "react-bootstrap";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area, ResponsiveContainer } from "recharts";
import "./Message.css";

const Message = ({ sender, content }) => {
  const isBot = sender === "bot";
  const bubbleClass = isBot ? "msg-bubble bot" : "msg-bubble user";
  if (typeof content === "string") {
    content = { text: content, intent: "general", data: null, visualization: null };
  }

  const renderVisualization = () => {
    if (!content.visualization || !content.data) return null;

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1", "#d084d0", "#ffb347"];

    switch (content.visualization) {
      case "pie":
      case "doughnut":
        return (
          <div className="mt-3">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={content.data} cx="50%" cy="50%" innerRadius={content.visualization === "doughnut" ? 60 : 0} outerRadius={120} paddingAngle={5} dataKey="amount" nameKey="category">
                  {content.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Math.abs(value)}`, "Amount"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case "bar":
        if (content.intent === "income_vs_expenses" && content.data.income !== undefined) {
          const incomeExpenseData = [
            {
              name: "Financials",
              Income: content.data.income,
              Expenses: Math.abs(content.data.expenses),
            },
          ];

          return (
            <div className="mt-3">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incomeExpenseData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Bar dataKey="Income" fill="#82ca9d" />
                  <Bar dataKey="Expenses" fill="#ff7c7c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        } else {
          return (
            <div className="mt-3">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={content.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Math.abs(value)}`, "Amount"]} />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        }

      case "line":
        return (
          <div className="mt-3">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={content.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Math.abs(value)}`, "Amount"]} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case "area":
        return (
          <div className="mt-3">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={content.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Math.abs(value)}`, "Amount"]} />
                <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case "summary_cards":
        return (
          <div className="mt-3">
            <Row>
              <Col md={4}>
                <Card className="text-center mb-2">
                  <Card.Body>
                    <h5 className="text-success">${content.data.total_income}</h5>
                    <small className="text-muted">Total Income</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center mb-2">
                  <Card.Body>
                    <h5 className="text-danger">${Math.abs(content.data.total_expenses)}</h5>
                    <small className="text-muted">Total Expenses</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center mb-2">
                  <Card.Body>
                    <h5 className={content.data.net >= 0 ? "text-success" : "text-danger"}>${content.data.net}</h5>
                    <small className="text-muted">Net Amount</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case "table":
        return (
          <div className="mt-3">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {content.data.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.title}</td>
                    <td>
                      <Badge bg={transaction.type === "Income" ? "success" : "danger"}>{transaction.category}</Badge>
                    </td>
                    <td className={transaction.amount >= 0 ? "text-success" : "text-danger"}>${Math.abs(transaction.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );

      default:
        return null;
    }
  };

  const renderStructuredData = () => {
    if (!content.data || content.visualization) return null;

    if (content.intent === "income_vs_expenses" && typeof content.data === "object" && content.data.income !== undefined) {
      return (
        <div className="mt-3">
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <h6>Financial Summary</h6>
                  <p>
                    <strong>Income:</strong> <span className="text-success">${content.data.income}</span>
                  </p>
                  <p>
                    <strong>Expenses:</strong> <span className="text-danger">${Math.abs(content.data.expenses)}</span>
                  </p>
                  <p>
                    <strong>Net:</strong> <span className={content.data.net >= 0 ? "text-success" : "text-danger"}>${content.data.net}</span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    if (content.intent === "budget_analysis" && content.data.recommendations) {
      return (
        <div className="mt-3">
          <Card>
            <Card.Body>
              <h6>Budget Recommendations</h6>
              <ul className="mb-0">
                {content.data.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </div>
      );
    }

    return null;
  };

  return (
    <Row className={`msg-row ${isBot ? "justify-content-start" : "justify-content-end"}`}>
      <Col xs={12} md={8} lg={6}>
        <Card className={bubbleClass}>
          <Card.Body>
            <small className="msg-sender">{isBot ? "Advisor" : "You"}</small>
            <div className="msg-text">{content.text}</div>
            {renderStructuredData()}
            {renderVisualization()}
            {content.intent !== "user_input" && (
              <Badge bg="secondary" className="msg-intent">
                {content.intent.replace(/_/g, " ")}
              </Badge>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Message;
