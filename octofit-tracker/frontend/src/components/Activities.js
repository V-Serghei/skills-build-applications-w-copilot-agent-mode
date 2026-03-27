import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setActivities(items);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Загрузка...</span></div></div>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-header bg-primary text-white">
            <h2 className="h4 mb-0">Активности</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Описание</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length === 0 ? (
                    <tr><td colSpan="3" className="text-center">Нет данных</td></tr>
                  ) : (
                    activities.map((activity, idx) => (
                      <tr key={activity.id || idx}>
                        <td>{idx + 1}</td>
                        <td>{activity.name || '-'}</td>
                        <td>{activity.description || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary mt-3" type="button" disabled>Добавить активность</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
