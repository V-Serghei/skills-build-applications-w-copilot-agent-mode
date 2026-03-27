import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setLeaders(items);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Загрузка...</span></div></div>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-header bg-success text-white">
            <h2 className="h4 mb-0">Таблица лидеров</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>Очки</th>
                  </tr>
                </thead>
                <tbody>
                  {leaders.length === 0 ? (
                    <tr><td colSpan="3" className="text-center">Нет данных</td></tr>
                  ) : (
                    leaders.map((leader, idx) => (
                      <tr key={leader.id || idx}>
                        <td>{idx + 1}</td>
                        <td>{leader.name || leader.username || '-'}</td>
                        <td>{leader.points || leader.score || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <button className="btn btn-success mt-3" type="button" disabled>Обновить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
