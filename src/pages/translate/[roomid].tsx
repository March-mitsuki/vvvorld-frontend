// dependencies lib
import { VideoJS } from "@/components"
import videojs from "video.js"
import { Title } from "@solidjs/meta";
import { createEffect, onCleanup } from "solid-js";
import { useParams } from "@solidjs/router";

// local dependencies
import { FloatingWindowX, FloatingWindow } from "@/components";
import { CheckArea, Navi, TranslatePane } from "@/components/pages";
import _pagetype from "@/components/contexts/page-type"
import _currentUser from "@/components/contexts/current-user"

// type
import type { c2sAddUser } from "@/interfaces/ws";


const TranslatePage = () => {
  // pagetype: false = 翻译, true = 校对, default = false
  const { pagetype } = _pagetype
  const { currentUser } = _currentUser

  const videoJSOption: videojs.PlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    liveui: true,
    autoplay: true,
    sources: [
      {
        src: "http://vvvrold.mitsuki114514.com/live/test.m3u8",
        type: "application/x-mpegURL"
      },
    ],
  }

  // 每个page连接不一样的ws room
  const baseUrl = "ws://192.168.64.3:8080/ws/"
  const param = useParams<{ roomid: string }>()
  const url = baseUrl + param.roomid
  let ws: WebSocket | undefined

  createEffect(() => {
    if (currentUser().id !== -1) {
      ws = new WebSocket(url)
      ws.onopen = () => {
        console.log("ws connected");
        const addUser: c2sAddUser = {
          head: {
            cmd: "addUser"
          },
          body: {
            uname: currentUser().user_name
          }
        }
        const postData = new TextEncoder().encode(JSON.stringify(addUser))
        ws?.send(JSON.stringify(addUser))
      }
      ws.onmessage = (evt) => {
        console.log("on msg:", evt.data);
      }
      ws.onclose = () => {
        console.log("ws close");
      }
      ws.onerror = (evt) => {
        console.log("ws err", evt);
      }

      onCleanup(() => {
        if (ws?.readyState === ws?.OPEN) {
          ws?.close()
        }
      })
    }
  })

  return (
    <>
      <Title>翻译页面</Title>
      <div class="h-full flex flex-col bg-neutral-700 text-white">
        <div class="shadow-lg mb-2 text-xl py-3 px-5">
          <Navi current_project={param.roomid}></Navi>
        </div>
        <div class="flex flex-auto pl-2">
          <div class="flex flex-col">
            <FloatingWindowX
              defaultWindowSize={{
                width: 500,
              }}
              minWindowSize={{
                width: 200,
              }}
              wrapperClass="w-[500px] flex-initial mb-1"
              controllerWrapperClass="flex justify-between items-center border-x-2 border-t-2 border-gray-500 rounded-t-lg bg-neutral-800"
              floatingControlContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              }
              floatingContent={
                <div class="select-none">直播源</div>
              }
              cancelControlContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
              contentsWrapperClass="border-2 border-gray-500 rounded-b-sm bg-neutral-700"
              risizerClass="bg-neutral-800 border-l-2 border-t-2 border-gray-500"
            >
              <VideoJS {...videoJSOption}></VideoJS>
            </FloatingWindowX>
            <FloatingWindow
              defaultWindowSize={{
                width: 500,
                height: 300,
              }}
              minWindowSize={{
                width: 435,
                height: 80,
              }}
              wrapperClass="w-[500px] max-h-[300px] flex flex-col"
              controllerWrapperClass="flex justify-between items-center border-x-2 border-t-2 border-gray-500 rounded-t-lg bg-neutral-800"
              floatingControlContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              }
              floatingContent={
                <div class="select-none">
                  {!pagetype() ? "翻译输入区" : "校对工具栏"}
                </div>
              }
              cancelControlContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
              contentsWrapperClass="border-2 border-gray-500 rounded-b-lg flex-auto bg-neutral-700"
              risizerClass="bg-neutral-800 border-l-2 border-t-2 border-gray-500"
            >
              <TranslatePane></TranslatePane>
            </FloatingWindow>
          </div>
          <div class="flex-auto h-[calc(100vh-70px)]" >
            <CheckArea ws={ws}></CheckArea>
          </div>
        </div>
      </div>
    </>
  )
}

export default TranslatePage
