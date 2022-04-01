import * as React from 'react';
import {ChangeEvent, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import {TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../m2-bll/redux';
import {addNewCardTC} from '../../m2-bll/reducers/cardReducer';
import s from './modal.module.css';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
type PropsType = {
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}


export default function ModalAddCard({title, open, setOpen,}: PropsType) {
    const dispatch = useDispatch();
    const questionForLearn = useTypedSelector(state => state.cards.currentCard.question);
    const cardsTotalCount = useTypedSelector(state => state.cards.data.cardsTotalCount);
    const status = useTypedSelector(state => state.app.status);
    // const handleClose = () => setOpen(false);


    const [question, setQuestion] = useState<string | undefined>('')
    const [answer, setAnswer] = useState<string | undefined>('')


    const [fileBase64, setBase64] = useState<string | ArrayBuffer | null>(null);


    const cardsPack_id = useTypedSelector(state => state.cards.getData.cardsPack_id)
    const inRef = useRef<HTMLInputElement>(null);

    const addOnClickHandler = () => {

        dispatch(addNewCardTC({'card': {cardsPack_id, answerImg: fileBase64, question, answer}}))

    }
    const onClickCancelHandler = () => {
        setQuestion('')
        setAnswer('')
        setOpen(false)
    }

    const onChangeHandlerAnswer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const onChangeHandlerQuestion = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAddFile = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            reader.onloadend = () => {
                const res = reader.result
                setBase64(res);
            }
            reader.readAsDataURL(newFile);
        }


    }
//comment
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={s.box}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom: '20px'}}>
                        {title}
                    </Typography>
                    <Grid container direction={'row'}>
                        <Grid item xs={12}>
                            <TextField fullWidth={true} variant={'standard'}
                                       sx={{marginBottom: '5px'}} maxRows={2} multiline
                                       placeholder={'question'} onChange={onChangeHandlerQuestion}
                                       value={question}
                            />
                            <input
                                onChange={onChangeAddFile}
                                type={'file'}
                                ref={inRef}
                            />
                            <TextField fullWidth={true} variant={'standard'}
                                       maxRows={4} multiline
                                       placeholder={'answer'} onChange={onChangeHandlerAnswer}
                                       value={answer}
                            />
                            <input
                                onChange={onChangeAddFile}
                                type={'file'}
                                ref={inRef}
                            />
                        </Grid>
                    </Grid>

                    <Grid container sx={{marginTop: 4}} xs={12}>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            <Button size={'small'} variant={'contained'}
                                    onClick={onClickCancelHandler}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>

                            <Button size={'small'} variant={'contained'} color={'primary'}
                                    onClick={addOnClickHandler}>{'save'}</Button>

                        </Grid>

                    </Grid>

                </Box>

            </Modal>
        </div>
    );
}
