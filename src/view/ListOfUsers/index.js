/**
 * @author Matheus Paice <matheus.ferreira@jbtec.com.br>
 * @description List of User
 */

import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { actionsTalk } from '../../store/ducks/talk';
import { actionsMessage } from '../../store/ducks/message';
import { actionsContact } from '../../store/ducks/contact';

import avatar from '../../assets/img/avatar.svg';

const style = {
    container: {
        height: '440px',
        overflowY: 'auto',
    },
    list: {
        cursor: 'pointer',
    },
};

const ListOfUser = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contact.data);
    
    const [id, setId] = useState(0);

    useEffect(() => {
      dispatch(actionsContact.listContact())
    }, [])

    const handleClick = (idUser, values) => {
        setId(idUser);
        dispatch(actionsTalk.toggle());
        dispatch(actionsTalk.getTalk(values));
        dispatch(actionsMessage.listMessage())
    };

    return (
      <div style={style.container}>
        <ListGroup style={style.list}>
          {contacts.length !== 0 ?
            contacts.map(v => (
              <ListGroupItem
                key={v.id}
                onClick={() => handleClick(v.id, v)}
                style={{
                        backgroundColor: id === v.id ? '#e9ecef' : null,
                    }}
              >
                <img src={avatar} width="45px" height="45px" alt='' />
                {v.firstName.toUpperCase()}
              </ListGroupItem>
            )) : (
              <ListGroupItem>
                <img src={avatar} width="45px" height="45px" alt='' />
                Nenhum usuário
              </ListGroupItem>
            )}
        </ListGroup>
      </div>
    );
};

export default ListOfUser;
