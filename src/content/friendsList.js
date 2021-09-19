import {useState, useRef} from 'react';
import { RiStarFill, RiDeleteBin6Line } from 'react-icons/ri';

import PopUp from './popUp.js';


const friendsList = () => {
    const inputRef = useRef();
    const [friendsList, updateFriendsList] = useState([]);
    const [popUpFor, setPopUpFor] = useState('');
    const [nameToBeDeleted, saveNameToBeDeleted] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const checkAndUpdate = (e) => {
        let code = e.keyCode || e.which;
        let value = e.target.value;

        if(value && code == '13'){
            if(friendsList.length && friendsList.filter((obj) => 
                obj.name.trim().toLowerCase() === value.trim().toLowerCase()).length)
                setPopUpFor('entryExists');
            else {
                if(friendsList.length+1 > 4)
                    setTotalPages(Math.ceil((friendsList.length+1)/4));

                updateFriendsList([...friendsList, {'name': value, isDear: false}]);
            }
            inputRef.current.blur();
            inputRef.current.value = '';
        }
    }

    const addDearFriend = (name) => {
        let copyOfList = [...friendsList];
        copyOfList = copyOfList.map(obj => {
            if(obj.name.trim().toLowerCase() === name.trim().toLowerCase())
                obj.isDear = !obj.isDear;

            return obj;
        });

        updateFriendsList(copyOfList);
    }

    const onDeleteClick = (name) => {
        setPopUpFor('deleteEntry');
        saveNameToBeDeleted(name);
    }

    const deleteFromList = (name) => {
        let copyOfList = [...friendsList];
        copyOfList = copyOfList.filter(obj => (obj.name.trim().toLowerCase() !== name.trim().toLowerCase()));
        setTotalPages(Math.ceil((copyOfList.length)/4));
        updateFriendsList(copyOfList);
    }

    const arrangeFriendsList = () => {
        let copyOfList = [...friendsList];
        copyOfList.sort((a, b) => 
            b.isDear - a.isDear
        );

        updateFriendsList(copyOfList);
    }
    
    const onNextClick = () => {
        let page = currentPage
        setCurrentPage(page+1);
    }

    const onBackClick = () => {
        let page = currentPage
        setCurrentPage(page-1);
    }

    const showPages = () => {
        // console.log({currentPage});
        // console.log({totalPages});

        let startIndex = (currentPage-1)*4;
        let lastIndex = startIndex+4;

        let listCopy = friendsList.slice(startIndex, lastIndex);

        // console.log({startIndex});
        // console.log({lastIndex});

        // console.log({listCopy});
        // console.log({friendsList});

        return listCopy.length > 0 && listCopy.map(friend =>
            <div key={friend.name} className='friend-container'>
                <div>
                    <span>{friend.name}</span>
                    <p style={{fontSize: '1rem', color: '#909090', margin: '0'}}>is your {`${friend.isDear ? 'dear' : ''} `} friend</p>
                </div>
                <div>
                    <span className='add-pointer' style={{padding: '0.5rem'}} onClick={() => addDearFriend(friend.name)}>
                        <RiStarFill 
                            color={ friend.isDear ? '#f5f513' : '#d3d3d3' }/>
                    </span>
                    <span className='add-pointer' style={{padding: '0.5rem'}} onClick={() => onDeleteClick(friend.name)}>
                        <RiDeleteBin6Line 
                            color='#ff6347' />
                    </span>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                popUpFor && 
                <PopUp 
                    popUpFor = {popUpFor} 
                    setPopUpFor = {setPopUpFor}
                    name = {nameToBeDeleted}
                    deleteFromList = {deleteFromList}
                />
            }
            <div className={`container ${popUpFor ? 'blur-container' : ''}`} >
                <header style={{textAlign: 'center'}}>
                    <h1>List of Friends</h1>
                </header>
                <main>
                    <div id='input-bar'>
                        <input
                            type='text'
                            ref={inputRef} 
                            placeholder='Enter friends name'  
                            onKeyPress={(e) => checkAndUpdate(e)}>
                        </input>
                        <button className='order-friends' onClick={arrangeFriendsList}>
                            Dear Ones First !
                        </button>
                    </div>
                    <div id='friends-list'>
                        {
                            friendsList.length > 0 && showPages()
                        }

                        {
                            totalPages > 1 ?
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <button 
                                    onClick={onBackClick}
                                    style= {{display: currentPage == 1 ? 'none' : ''}}>
                                    Back
                                </button>
                                <button 
                                    onClick={onNextClick}
                                    style= {{display: currentPage == totalPages ? 'none' : ''}}>
                                    Next
                                </button>
                            </div>
                            :
                            ''
                        }
                    </div>
                </main>
            </div>
        </>
    );
}

export default friendsList;