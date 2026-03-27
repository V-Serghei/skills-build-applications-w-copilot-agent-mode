import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setTeams(items);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Загрузка...</span></div></div>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-header bg-info text-white">
            <h2 className="h4 mb-0">Команды</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Участники</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr><td colSpan="3" className="text-center">Нет данных</td></tr>
                  ) : (
                    teams.map((team, idx) => (
                      <tr key={team.id || idx}>
                        <td>{idx + 1}</td>
                        <td>{team.name || '-'}</td>
                        <td>{team.members ? team.members.length : '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <button className="btn btn-info mt-3 text-white" type="button" disabled>Создать команду</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
