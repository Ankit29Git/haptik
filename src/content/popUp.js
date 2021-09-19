const popUp = (props) => {
    const {popUpFor, setPopUpFor, name, deleteFromList} = props;
    const showContent = () => {
        if(popUpFor === 'entryExists')
            return 'You already have a friend with same Name.'
        else
            return <div>Remove <span style={{textTransform: 'capitalize', color: '#f3a43e'}}>{name}</span> from Friends List ?</div>
    }

    const onBtnClick = (shoulDelete) => {
        if(shoulDelete)
            deleteFromList(name)

        setPopUpFor('');
    }

    return (
        <div className='popup-container'>
            <div className='popUp'>
                <p>{showContent()}</p>
                <div>
                    {
                        popUpFor === 'entryExists' 
                        ? 
                            <button className='btn-css' onClick={onBtnClick}>OK</button>
                        :
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <button style={{marginRight: '2rem'}} className='btn-css' onClick={() => onBtnClick(true)}>Yes</button>
                                <button className='btn-css' onClick={() => onBtnClick(false)}>Cancel</button>
                            </div>
                    }
                </div>
            </div>
            
        </div>    
    );
}

export default popUp;