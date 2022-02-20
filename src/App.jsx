import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import f1 from "./face1.svg";
import f2 from "./face2.svg";
import f3 from "./face3.svg";

import { useCallback, useMemo } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Component } from "react";
import { render } from "react-dom";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import SelectionHighlighter from "react-highlight-selection";

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(
            ' <p className={ "w-100 para mt-4 mb-5 "}> There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salteration in some form, by injected   humour, or randomised wowhich dont look even slightly believable. If    you are going to use a passage. There are many variations of Lorem  Ipsum but the majority have suffered alteration There are many  variationpassages of Lorem Ipsum available, but the majority have  salteration in some form, by injected humour, or randowowhich dont  look even slightly believable. If you are going to use a passage.</p> '
          )
        )
      ),
    };
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: false },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </div>
    );
  }
}

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID ##clientid##");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      console.log(error);
      reject(error);
    });
  });
}

export const App = () => {
  const [tab1, settab1] = useState(null);
  const [tab2, settab2] = useState(null);
  const [tab3, settab3] = useState(null);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const text1 =
    "There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassadon't look even slightly believable. If you are going to use a passage.";
  const text3 =
    "There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassabelievable. If you are going to don’t look even slightly believable. If you are going to use a passage.";
  
  const selectionHandler1 = (selection) => {
    console.log(selection.selection);
    if(selection)
    settab1(selection.selection);
  };
  const selectionHandler2 = (selection) => {
    console.log(selection.selection);
     if(selection)
    settab2(selection.selection);
  };
  const selectionHandler3 = (selection) => {
    console.log(selection.selection);
     if(selection)
   settab3(selection.selection) ;
  };

  return (
    <div>
      <div
        className="bg-light d-flex align-items-center"
        style={{ height: "61px" }}
      >
        <img src={logo} alt="" className="ms-3 me-4 " />
        <span className="topic1">Data</span>
      </div>
      <div className="container">
        <div className="topic2 mt-3 mb-4">John Doe Interview </div>

        <EditorContainer className="bg-light"> </EditorContainer>

        <div className="row">
          <div className=" bg-light p-3 rounded container mt-5 col-12 col-md-9">
            <div className="box1 ms-5 mb-3">Box 1</div>
            <div className="row">
              <div
                className="col-3 col-md-2 col-lg-1 text-end"
                style={{ position: "relative" }}
              >
                <img src={f1} alt="" className="pic " />
              </div>
              <div className="col">
                <div className="">
                  <span className="span1">Speaker 1</span>
                  <span className="span2 ms-2">9:45</span>
                </div>
                <div className="des mt-3">
                  <SelectionHighlighter
                    text={text1}
                    selectionHandler={selectionHandler1}
                    customClass="custom-class1"
                  />
                </div>
              </div>
            </div>

            <div className="row my-5">
              <div
                className="col-3 col-md-2 col-lg-1  text-end"
                style={{ position: "relative" }}
              >
                <img src={f2} alt="" className="pic" />
              </div>
              <div className="col">
                <div className="">
                  <span className="span1">Speaker 2</span>
                  <span className="span2 ms-2">6:45</span>
                </div>
                <div className="des mt-3">
                  <SelectionHighlighter
                    text={text1}
                    selectionHandler={selectionHandler2}
                    customClass="custom-class2"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div
                className="col-3 col-md-2 col-lg-1 text-end "
                style={{ position: "relative" }}
              >
                <img src={f3} alt="" className="pic" />
              </div>
              <div className="col">
                <div className="">
                  <span className="span1">Speaker 3</span>
                  <span className="span2 ms-2">4:45</span>
                </div>
                <div className="des mt-3">
                  <SelectionHighlighter
                    text={text3}
                    selectionHandler={selectionHandler3}
                    customClass="custom-class3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 mt-5">
            {tab1?<div className="custom-class1 rounded px-2 py-1 m-1  my-5">{tab1.length>30? tab1.substring(0,30)+"...   "+tab1.length : tab1.substring(0,30)+"   "+tab1.length}</div>:null}
            {tab2?<div className="custom-class2 rounded px-2 py-1 m-1 my-5">{tab2.length>30? tab2.substring(0,30)+"...   "+tab2.length : tab2.substring(0,30)+"   "+tab2.length }</div>:null}
            {tab3?<div className="custom-class3 rounded px-2 py-1 m-1 my-5">{tab3.length>30? tab3.substring(0,30)+"...   "+tab3.length : tab3.substring(0,30)+"   "+tab3.length }</div>:null}
            
          </div>
        </div>
      </div>
      <div className="" style={{ height: "100px" }}></div>
      <div></div>
    </div>
  );
};
