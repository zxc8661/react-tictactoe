import React,{useState,useRef} from 'react';
import styled from 'styled-components';


const Button = styled.button`
    height:50px;
    width:50px;
    background:white;
    border-width:1px;



    
    &:disabled{
        background:white;
        border-width:1px;
        color:black;
        border-color:black;
    }
   
`;

const Restart=styled.button`
    height:50px;
    width:150px;
    background:#50C8FF;
    border-radius:10px;
    border-color:#50C8FF;
`
const BoardRow = styled.div`
  display: flex; /* Flexbox를 사용하여 버튼들을 한 줄로 배치 */
`;

function Square({value, onClick,index,gameOver}){
    return <Button className='square' 
    onClick={()=>onClick(index)}
   disabled={gameOver || value !== ""}
    ><span>{value}</span></Button>;
}




const result=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


function ResultCheck({square,next,setGameOver}){
    const checkResult=()=>{
        for(const [a,b,c] of result){
             if(
                square[a]&&
                square[a]===square[b]&&
                square[a]===square[c]
            ){
                setGameOver(true);
                return (
                    <>
                        <div>
                            {square[a]}님의 승리 입니다
                        </div>
                        <div>게임이 종료되었습니다</div>
                    </>
                )
            }
        }
                return (
                    <>
                    <div>게임이 진행되고 있습니다.</div>
                    <div>{next.current}차례입니다.</div>
                    </>
                )
        
        
    }

    return <div>{checkResult()}</div>
            
   
}




export default function Board(){
    const [square,setSquare]=useState(Array(9).fill(""));
    const next=useRef('X');
    const [gameOver,setGameOver]=useState(false)


    const ReStart=()=>{
        setGameOver(false);
        setSquare(Array(9).fill(""));
    }


    const squareClick=(index)=>{
            
            const newSquare=square.slice();

          

            if(newSquare[index]===""){
                newSquare[index]=next.current;
                setSquare(newSquare);
                    
                
                if(next.current==='X') next.current='O';
                else next.current='X';
            }

    
    }
    return(
        <>
            <BoardRow>
                <Square index={0} onClick={squareClick} value={square[0]}  gameOver={gameOver}/>
                <Square index={1} onClick={squareClick} value={square[1]} gameOver={gameOver}/>
                <Square index={2} onClick={squareClick} value={square[2]} gameOver={gameOver}/>
                </BoardRow>
                <BoardRow>
                <Square index={3} onClick={squareClick} value={square[3]} gameOver={gameOver}/>
                <Square index={4} onClick={squareClick} value={square[4]} gameOver={gameOver}/>
                <Square index={5} onClick={squareClick} value={square[5]} gameOver={gameOver}/>
            </BoardRow>
            <BoardRow>
                <Square index={6} onClick={squareClick}value={square[6]} gameOver={gameOver}/>
                <Square index={7} onClick={squareClick}value={square[7]} gameOver={gameOver}/>
                <Square index={8} onClick={squareClick}value={square[8]} gameOver={gameOver}/>
            </BoardRow> 
            <ResultCheck square={square} next={next} setGameOver={setGameOver} />
           <Restart onClick={ReStart}>restart</Restart>
            
        </>
    )
}