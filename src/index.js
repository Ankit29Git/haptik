import FriendsList from './content/friendsList';
import './content/style.scss';

class Welcome extends React.Component {
    render() {
        return (
            <div>
                <FriendsList />
            </div>

        )
    }
}
ReactDOM.render(<Welcome />, document.getElementById("root"));

module.hot.accept(); // This added the Hot Reload functionality 