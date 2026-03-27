import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setWorkouts(items);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Загрузка...</span></div></div>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-header bg-warning text-dark">
            <h2 className="h4 mb-0">Тренировки</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Длительность</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">Нет данных</td></tr>
                  ) : (
                    workouts.map((workout, idx) => (
                      <tr key={workout.id || idx}>
                        <td>{idx + 1}</td>
                        <td>{workout.name || '-'}</td>
                        <td>{workout.type || '-'}</td>
                        <td>{workout.duration || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <button className="btn btn-warning mt-3 text-dark" type="button" disabled>Добавить тренировку</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
