import React from "react";
import {
  //Logo,
  Column,
  //CheckboxLabel,
  //RadioGroup,
  //Button,
  //Row,
  //SubHeadline,
  //Headline,
  Paragraph
  //Wolf
} from "cross-country";
import Dancer from "./Dancer";
import Pusher from "pusher-js";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher("af0cc5fe0ac96ae0af44", {
  cluster: "us2",
  forceTLS: true
});

const vipList = [{ id: 0, name: "Brando" }];

export default function DanceFloor() {

  const channel = pusher.subscribe("nationalpark");

  channel.bind("new-dancer", function(data) {
    //alert(JSON.stringify(data));
    const dancers = JSON.stringify(data);
     console.log("Channel data: ", data);
    console.log("Channel dancers: ", dancers);
  });

  const handleClick = (e) => {
    console.log("handleClick -> e", e)
    //e.preventDefault();
    const name = `brando ${new Date().toString()}`;

    const dancer = {
            name,
            height: '6.2',
            weight: '175',
            gender: 'male',
            musicLikes: 'house, techno, drumandbass, classical, punk, folk',
        }

    channel.trigger("client-new-dancer", { dancer });
  };

  const dancers = vipList.map(vip => (
    <div key={vip.id}>
      <Dancer vip={vip} handleClick={handleClick} />
    </div>
  ));

  return <Column>{dancers}</Column>;
}
