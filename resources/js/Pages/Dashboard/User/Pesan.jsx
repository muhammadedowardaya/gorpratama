import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { GiMove } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import moment from "moment";
import Layout from "@/Layouts/Layout";
import Chat from "@/Components/Chat";
import TruncateText from "@/Components/TruncateText";
import { FiMove } from "react-icons/fi";

function Pesan() {
    // untuk komponen chat
    const [chatChannel, setChatChannel] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [tanggal, setTanggal] = useState("");

    function delay() {
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }

    async function synchronousDelayShowChat() {
        setShowChat(false);
        await delay();
        setShowChat(true);
    }

    // untuk isi properti komponen chat
    const [recipientId, setRecipientId] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientPhoto, setRecipientPhoto] = useState("");
    const { auth } = usePage().props;

    const [pesanGroupBelumDibaca, setPesanGroupBelumDibaca] = useState([]);

    const [pesanGroupDibaca, setPesanGroupDibaca] = useState([]);

    async function getUnreadMessage() {
        try {
            const response = await axios.get("/api/chat/unread-conversations");
            setPesanGroupBelumDibaca(Object.values(response.data.pesan_group));
        } catch (error) {
            console.info(error);
        }
    }

    async function getReadMessage() {
        try {
            const response = await axios.get("/api/chat/read-conversations");
            setPesanGroupDibaca(Object.values(response.data.pesan_group));
        } catch (error) {
            console.info(error);
        }
    }

    useEffect(() => {
        getUnreadMessage();
        getReadMessage();
        window.Echo.channel("messages").listen("MessageEvent", (event) => {
            getUnreadMessage();
            getReadMessage();
        });
        console.info(`chat_channel = ${chatChannel}`);
        console.info(`recipient_id = ${recipientId}`);
        console.info(`sender_id = ${auth.user.id}`);
    }, [recipientId, chatChannel]);

    return (
        <div className="flex flex-col items-center text-gray-800 w-full">
            <div className="flex items-center justify-between mt-6 mb-2">
                <h1 className="text-2xl font-bold text-white">Pesan</h1>
            </div>
            <div
                className={`bg-[#B9EDDD] dark:bg-gray-800 p-4 rounded ${
                    pesanGroupBelumDibaca.length > 0 ? "" : "hidden"
                }`}
            >
                <h2 className={` text-center mb-4 dark:text-gray-100`}>
                    Pesan belum dibaca
                </h2>
                <hr className="border-slate-700" />
                <ul>
                    {Array.isArray(pesanGroupBelumDibaca) &&
                    pesanGroupBelumDibaca.length > 0
                        ? pesanGroupBelumDibaca.map((pesan, index) => (
                              <div
                                  key={index}
                                  onClick={() => {
                                      synchronousDelayShowChat();
                                      setShowLoading(true);
                                      setChatChannel(pesan[0].chat_channel);
                                      setRecipientId(pesan[0].sender.id);
                                      setRecipientName(pesan[0].sender.nama);
                                      setRecipientPhoto(
                                          pesan[0].sender.url_foto
                                      );
                                      console.info(
                                          `chat_channel = ${chatChannel}`
                                      );
                                      console.info(
                                          `recipient_id = ${recipientId}`
                                      );
                                      console.info(
                                          `sender_id = ${auth.user.id}`
                                      );
                                      axios
                                          .put(
                                              `/api/chat/mark-as-read/${pesan[0].chat_channel}`
                                          )
                                          .then((response) => {
                                              setShowLoading(false);
                                          })
                                          .catch((error) => {
                                              console.info(error);
                                          });
                                  }}
                                  onTouchStart={() => {
                                      synchronousDelayShowChat();
                                      setShowLoading(true);
                                      setChatChannel(pesan[0].chat_channel);
                                      setRecipientId(pesan[0].sender.id);
                                      setRecipientName(pesan[0].sender.nama);
                                      setRecipientPhoto(
                                          pesan[0].sender.url_foto
                                      );
                                      axios
                                          .put(
                                              `/api/chat/mark-as-read/${pesan[0].chat_channel}`
                                          )
                                          .then((response) => {
                                              setShowLoading(false);
                                          })
                                          .catch((error) => {
                                              console.info(error);
                                          });
                                  }}
                              >
                                  <div className="mt-4 dark:text-gray-100">
                                      Channel :{" "}
                                      <span className="bg-yellow-400 text-gray-800 px-1">
                                          {pesan[0].chat_channel}
                                      </span>
                                  </div>
                                  <div className="flex justify-between w-[80vw] md:w-[500px] items-center bg-gray-100 hover:bg-gray-200 shadow px-2 py-1 rounded cursor-pointer select-none">
                                      <div className="flex items-center">
                                          <img
                                              src={pesan[0].sender.url_foto}
                                              alt="sender photo"
                                              className="w-10 h-10 rounded-full border border-gray-300 mr-2 object-cover object-center"
                                          />
                                          <div>
                                              <p className="font-extrabold text-[0.8em] sm:text-base">
                                                  {pesan[0].sender.nama}
                                              </p>
                                              <span className="text-slate-500 dark:text-slate-700 text-sm sm:text-base sm:hidden">
                                                  <TruncateText
                                                      text={pesan[0].message}
                                                      limit={15}
                                                  />
                                              </span>
                                              <span className="text-slate-500 dark:text-slate-700 text-sm sm:text-base hidden sm:inline-block overflow-hidden">
                                                  <TruncateText
                                                      text={pesan[0].message}
                                                      limit={50}
                                                  />
                                              </span>
                                          </div>
                                      </div>
                                      <div>
                                          <span className="text-[0.7em] mr-1 pl-2">
                                              {moment(
                                                  pesan[0].created_at
                                              ).format("HH:mm")}
                                          </span>
                                          {pesan.length > 0 && (
                                              <div className="ml-3 font-bold bg-sky-500 text-sm w-5 h-5 text-center text-white rounded-full">
                                                  {pesan.length}
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          ))
                        : ""}
                </ul>
            </div>
            <div
                dark:text-slate-700
                className={`bg-[#B9EDDD] dark:bg-gray-800 p-4 rounded  mt-8 ${
                    pesanGroupDibaca.length > 0 ? "" : "hidden"
                }`}
            >
                <h2
                    className={`text-center  mb-4 dark:text-gray-100 ${
                        pesanGroupDibaca.length > 0 ? "" : "hidden"
                    }`}
                >
                    Pesan dibaca
                </h2>
                <hr className="border-slate-700" />
                <ul>
                    {Array.isArray(pesanGroupDibaca) &&
                    pesanGroupDibaca.length > 0
                        ? pesanGroupDibaca.map((pesan, index) => (
                              <div
                                  key={index}
                                  onClick={(e) => {
                                      setShowChat(true);
                                      setChatChannel(pesan[0].chat_channel);
                                      setTanggal(pesan[0].tanggal);
                                      setRecipientId(pesan[0].sender.id);
                                      setRecipientName(pesan[0].sender.nama);
                                      setRecipientPhoto(
                                          pesan[0].sender.url_foto
                                      );
                                  }}
                                  onTouchStart={(e) => {
                                      setShowChat(true);
                                      setChatChannel(pesan[0].chat_channel);
                                      setTanggal(pesan[0].tanggal);
                                      setRecipientId(pesan[0].sender.id);
                                      setRecipientName(pesan[0].sender.nama);
                                      setRecipientPhoto(
                                          pesan[0].sender.url_foto
                                      );
                                  }}
                              >
                                  <div className="mt-4 dark:text-gray-100">
                                      Channel :{" "}
                                      <span className="bg-yellow-400 text-gray-800 px-1">
                                          {pesan[0].chat_channel}
                                      </span>
                                  </div>
                                  <div className="flex justify-between w-[80vw] md:w-[500px] items-center bg-gray-100 hover:bg-gray-200 shadow px-2 py-1 rounded cursor-pointer select-none">
                                      <div className="flex items-center">
                                          <img
                                              src={pesan[0].sender.url_foto}
                                              alt="sender photo"
                                              className="w-10 h-10 rounded-full border border-gray-300 mr-2 object-cover object-center"
                                          />
                                          <div>
                                              <p className="font-extrabold text-[0.8em] sm:text-base">
                                                  {pesan[0].sender.nama}
                                              </p>
                                              <span className="text-slate-500 dark:text-slate-700 text-sm sm:text-base sm:hidden">
                                                  <TruncateText
                                                      text={pesan[0].message}
                                                      limit={15}
                                                  />
                                              </span>
                                              <span className="text-slate-500 dark:text-slate-700 text-sm sm:text-base hidden sm:inline-block overflow-hidden">
                                                  <TruncateText
                                                      text={pesan[0].message}
                                                      limit={50}
                                                  />
                                              </span>
                                          </div>
                                      </div>
                                      <div>
                                          <span className="text-[0.7em] mr-1">
                                              {moment(
                                                  pesan[0].created_at
                                              ).format("HH:mm")}
                                          </span>
                                          {/* {pesan.length > 0 && (
                                        <div className="ml-1 font-bold bg-gray-300 text-sm w-5 h-5 text-center text-white rounded-full">
                                            {pesan.length}
                                        </div>
                                    )} */}
                                      </div>
                                  </div>
                              </div>
                          ))
                        : ""}
                </ul>
            </div>
            {pesanGroupBelumDibaca.length == 0 &&
            pesanGroupDibaca.length == 0 ? (
                <>
                    <h2 className={` text-center mb-4`}>Belum ada pesan</h2>
                    <hr className="border-slate-700" />
                </>
            ) : (
                ""
            )}
            {showChat && (
                <Draggable handle=".drag" cancel=".chat">
                    <div
                        className={`block fixed border-r z-50  bottom-16 sm:bottom-5 right-8 border border-slate-50 rounded-md bg-opacity-20 select-none`}
                        style={{
                            backgroundImage: `url(${
                                import.meta.env.VITE_APP_URL
                            }/assets/background/bg-chat-3-min.jpg)`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "contain",
                        }}
                    >
                        <Chat
                            className="chat"
                            chatChannel={chatChannel}
                            tanggal={tanggal}
                            senderId={auth.user.id}
                            recipientId={recipientId}
                            senderPhoto={auth.user.url_foto}
                            recipientPhoto={recipientPhoto}
                            senderName={auth.user.nama}
                            recipientName={recipientName}
                        />

                        <button
                            className="fixed -top-3 -right-3 z-50"
                            onClick={(e) => {
                                setShowChat(false);
                            }}
                            onTouchStart={(e) => {
                                setShowChat(false);
                            }}
                        >
                            <IoCloseCircle
                                size="2em"
                                className="fill-red-600 bg-gray-50 rounded-full p-0"
                            />
                        </button>
                        <button className="fixed -top-3 -left-3 z-50 drag">
                            <GiMove
                                size="2em"
                                className="fill-gray-800 bg-gray-50 rounded-full p-0"
                            />
                        </button>
                        <div
                            className={`absolute z-20 top-0 bottom-0 left-0 right-0 bg-gray-800 text-gray-50 ${
                                showLoading ? "flex" : "hidden"
                            } justify-center items-center`}
                        >
                            <span>Loading...</span>
                        </div>
                    </div>
                </Draggable>
            )}
        </div>
    );
}

export default Pesan;

Pesan.layout = (page) => <Layout children={page} title="Pesan" />;
