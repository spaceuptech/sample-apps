import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UsersList from './UsersList';

const UserDirectoryDialog = (props) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(props.open);

    }, [props]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={props.onClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
            >
                <DialogTitle id="scroll-dialog-title">Start a new chat</DialogTitle>
                <DialogContent>
                    <UsersList onUserSelect={props.onClose}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UserDirectoryDialog;