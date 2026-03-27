import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setUsers(items);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Загрузка...</span></div></div>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-header bg-secondary text-white">
            <h2 className="h4 mb-0">Пользователи</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Имя пользователя</th>
                    <th>Имя</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">Нет данных</td></tr>
                  ) : (
                    users.map((user, idx) => (
                      <tr key={user.id || idx}>
                        <td>{idx + 1}</td>
                        <td>{user.username || '-'}</td>
                        <td>{user.name || '-'}</td>
                        <td>{user.email || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <button className="btn btn-secondary mt-3 text-white" type="button" disabled>Добавить пользователя</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
