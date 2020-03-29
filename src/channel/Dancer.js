import React from 'react';
import {
  //Logo,
  Column,
  //CheckboxLabel,
  //RadioGroup,
  Button,
  //Row,
  //SubHeadline,
  //Headline,
  Paragraph,
  //Wolf
} from "cross-country";

export default function Dancer({vip, handleClick}){
    return(
        <Column>
           <Paragraph text={vip.name} />
           <Button text={"dance"} handleClick={handleClick} />
        </Column>
    )
}