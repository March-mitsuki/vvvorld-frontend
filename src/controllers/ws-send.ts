// local dependencies
import rootCtx from "@/components/contexts";

// type
import { Subtitle } from "@/interfaces";
import type {
  c2sChangeUser,
  c2sGetRoomSubtitles,
  c2sChangeSubtitle,
  c2sAddSubtitleUp,
  c2sAddSubtitleDown,
  c2sEditStart,
  c2sEditEnd,
  c2sAddTranslatedSubtitle,
  c2sDeleteSubtitle,
  c2sReordrSubFront,
  c2sReordrSubBack,
  c2sSendSubtitle,
  c2sSendSubDirect,
  c2sChangeStyle,
  c2sChangeBilingual,
  StyleData,
  c2sChangeReversed,
  c2sHeartBeat,
} from "@/interfaces/ws";

const { currentUser } = rootCtx.currentUserCtx;

export const addUser = (ws: WebSocket) => {
  const _addUser: c2sChangeUser = {
    head: {
      cmd: "changeUser",
    },
    body: {
      uname: currentUser().user_name,
    },
  };
  const addUser = new TextEncoder().encode(JSON.stringify(_addUser));
  ws.send(addUser);
};

export const getRoomSubtitles = (ws: WebSocket, wsroom: string) => {
  const _getRoomSubtitles: c2sGetRoomSubtitles = {
    head: {
      cmd: "getRoomSubtitles",
    },
    body: {
      wsroom: wsroom,
    },
  };
  const getRoomSubtitles = new TextEncoder().encode(JSON.stringify(_getRoomSubtitles));
  ws.send(getRoomSubtitles);
};

export const changeSubtitle = ({
  ws,
  subtitle,
}: {
  ws: WebSocket | undefined;
  subtitle: Subtitle;
}) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sChangeSubtitle = {
    head: {
      cmd: "changeSubtitle",
    },
    body: {
      subtitle: subtitle,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const addSubtitleUp = ({
  ws,
  pre_id,
  pre_idx,
  room_id,
}: {
  ws: WebSocket | undefined;
  pre_id: number;
  pre_idx: number;
  room_id: number;
}) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sAddSubtitleUp = {
    head: {
      cmd: "addSubtitleUp",
    },
    body: {
      pre_subtitle_id: pre_id,
      pre_subtitle_idx: pre_idx,
      room_id: room_id,
      checked_by: currentUser().user_name,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const addSubtitleDown = ({
  ws,
  pre_id,
  pre_idx,
  room_id,
}: {
  ws: WebSocket | undefined;
  pre_id: number;
  pre_idx: number;
  room_id: number;
}) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sAddSubtitleDown = {
    head: {
      cmd: "addSubtitleDown",
    },
    body: {
      pre_subtitle_id: pre_id,
      pre_subtitle_idx: pre_idx,
      room_id: room_id,
      checked_by: currentUser().user_name,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const editStart = (ws: WebSocket | undefined, subtitle_id: number) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sEditStart = {
    head: {
      cmd: "editStart",
    },
    body: {
      uname: currentUser().user_name,
      subtitle_id: subtitle_id,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const editEnd = (ws: WebSocket | undefined, subtitle_id: number) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sEditEnd = {
    head: {
      cmd: "editEnd",
    },
    body: {
      uname: currentUser().user_name,
      subtitle_id: subtitle_id,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const addTranslatedSubtitle = ({
  ws,
  subtitle,
}: {
  ws: WebSocket | undefined;
  subtitle: Subtitle;
}) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sAddTranslatedSubtitle = {
    head: {
      cmd: "addTransSub",
    },
    body: {
      new_subtitle: subtitle,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const deleteSubtitle = (ws: WebSocket | undefined, subtitle: Subtitle) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sDeleteSubtitle = {
    head: {
      cmd: "deleteSubtitle",
    },
    body: {
      subtitle: subtitle,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const reorderSubFront = ({
  ws,
  drag_id,
  drop_id,
  room_id,
}: {
  ws: WebSocket | undefined;
  drag_id: number;
  drop_id: number;
  room_id: number;
}) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sReordrSubFront = {
    head: {
      cmd: "reorderSubFront",
    },
    body: {
      operation_user: currentUser().user_name,
      room_id: room_id,
      drag_id: drag_id,
      drop_id: drop_id,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const reorderSubBack = ({
  ws,
  drag_id,
  drop_id,
  room_id,
}: {
  ws: WebSocket | undefined;
  drag_id: number;
  drop_id: number;
  room_id: number;
}) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sReordrSubBack = {
    head: {
      cmd: "reorderSubBack",
    },
    body: {
      operation_user: currentUser().user_name,
      room_id: room_id,
      drag_id: drag_id,
      drop_id: drop_id,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const sendSubtitle = ({
  ws,
  subtitle,
}: {
  ws: WebSocket | undefined;
  subtitle: Subtitle;
}) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sSendSubtitle = {
    head: {
      cmd: "sendSubtitle",
    },
    body: {
      subtitle: subtitle,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const sendSubtitleDirect = ({
  ws,
  subtitle,
}: {
  ws: WebSocket | undefined;
  subtitle: Subtitle;
}) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sSendSubDirect = {
    head: {
      cmd: "sendSubtitleDirect",
    },
    body: {
      subtitle: subtitle,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const changeStyle = ({
  ws,
  styleObj,
}: {
  ws: WebSocket | undefined;
  styleObj: StyleData;
}) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sChangeStyle = {
    head: {
      cmd: "changeStyle",
    },
    body: styleObj,
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const changeBilingual = (ws: WebSocket | undefined, bilingual: boolean) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sChangeBilingual = {
    head: {
      cmd: "changeBilingual",
    },
    body: {
      bilingual: bilingual,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const changeReversed = (ws: WebSocket | undefined, reversed: boolean) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sChangeReversed = {
    head: {
      cmd: "changeReversed",
    },
    body: {
      reversed: reversed,
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};

export const heartBeat = (ws: WebSocket | undefined) => {
  if (typeof ws === "undefined" || ws.readyState === ws.CLOSED) {
    // window.alert("正在连接到服务器, 请稍等")
    console.log("ws is closed or not connected, please wait");
    return;
  }
  const _postData: c2sHeartBeat = {
    head: {
      cmd: "heartBeat",
    },
    body: {
      obj: "[object]",
    },
  };
  const postData = new TextEncoder().encode(JSON.stringify(_postData));
  ws.send(postData);
};
