import { ellipsis } from 'polished';
import { useGetUser } from '../../lib/learn/user';
import { useGetPoints } from '../../lib/learn/records';
import { login, logout } from '../../lib/learn/actions';
import GitHubButton from './github-button';

const tweet = points => {
  const url = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fnextjs.org%2Flearn&text=I%20just%20got%20${points}%20points✨%20on`;
  window.open(url, '_blank');
};

const Profile = ({ isMobile }) => {
  const user = useGetUser();
  const points = useGetPoints();

  if (!user) {
    if (isMobile) {
      return (
        <div className="namecard">
          <GitHubButton login={login} flat text="Login" />
          <style jsx>{`
            .namecard {
              display: flex;
              height: 2.5rem;
            }
          `}</style>
        </div>
      );
    }
    return (
      <div className="namecard">
        <GitHubButton login={login} flat />
        <p className="f6 mute">Start to learn the most advanced Web technologies, today.</p>
        <style jsx>{`
          p {
            margin: 0;
          }
          .namecard {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 264px;
            height: 128px;
            padding: 1rem;
            border-radius: 7px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="namecard f6">
        <div>
          <strong className="fw6">{points}</strong> &#x2728;
        </div>
        <div className="fw5 username" style={ellipsis()}>
          {user.name}
        </div>
        <button type="button" onClick={logout}>
          Logout
        </button>
        <style jsx>{`
          .namecard {
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
            margin-top: 1px;
          }
          .username {
            max-width: 7rem;
          }
          button {
            flex: 1;
            height: 2rem;
            line-height: 2rem;
            padding: 0 0.5rem;
            margin: 0;
            font-size: inherit;
            outline: none;
            border: none;
            background: none;
            -webkit-appearance: none;
            color: #aeaeae;
            cursor: pointer;
            transition: color 0.2s ease;
          }
        `}</style>
      </div>
    );
  }

  const avatarUrl = `https://github.com/${user.username || 'ghost'}.png?size=128`;

  return (
    <div className="namecard">
      <div className="profile">
        <img className="avatar" alt="Avatar" src={avatarUrl} />
        <div className="info">
          <p className="f-reset fw6 username" style={ellipsis()}>
            {user.name}
          </p>
          <div className="f5">
            {points ? (
              <>
                <strong className="fw7">{points}</strong> points &#x2728;
              </>
            ) : (
              <>&nbsp;</>
            )}
          </div>
        </div>
      </div>
      <div className="buttons">
        <button type="button" className="f5" onClick={logout}>
          Logout
        </button>
        {points > 0 && (
          <button type="button" className="f5" onClick={() => tweet(points)}>
            Tweet
          </button>
        )}
      </div>
      <style jsx>{`
        .profile {
          display: flex;
          align-items: center;
          padding: 1rem 1rem 0;
        }
        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          white-space: nowrap;
          overflow: hidden;
        }
        .avatar {
          width: 64px;
          height: 64px;
          margin-right: 1rem;
          border-radius: 50%;
        }
        .logout {
          margin-left: 0.2rem;
        }
        .info p {
          margin: 0;
        }
        .buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin: 0 0.5rem;
        }
        .buttons button {
          flex: 1;
          height: 2rem;
          padding: 0;
          margin: 0.5rem;
          outline: none;
          border: none;
          background: none;
          -webkit-appearance: none;
          color: #aeaeae;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .buttons button:hover {
          color: #111;
        }
        .namecard {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 264px;
          height: 128px;
          border-radius: 7px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Profile;
