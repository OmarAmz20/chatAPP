import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk("chat/fetchUsers", async (user) => {
  const response = await axios.get(`http://localhost:4000/users/${user}`);
  return response.data;
});

export const getMsg = createAsyncThunk("chat/getMsg", async ({ user1, user2 }) => {
  const response = await axios.post(`http://localhost:4000/getMsgs`,{user1,user2});
  return response.data;
});

export const getInvitations = createAsyncThunk("chat/getInvitations", async ({ user }) => {
  console.log("Calling getInvitations API with user:", user);
  const response = await axios.get(`http://localhost:4000/getInvitations/${user}`);
  console.log("Received invitations:", response.data);
  return response.data;
});

export const getFriends = createAsyncThunk("chat/getFriends", async ({ user }) => {
  console.log("Calling getInvitations API with user:", user);
  const response = await axios.get(`http://localhost:4000/friends/${ user }`);
  console.log("Received friends:", response.data);
  return response.data.friends;
});


const chatSlice = createSlice({
  name: "chat",
  initialState: {
    user: "",
    users: [],
    chatContent: [],
    invitations: [],
    friends: [],
    reception: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    searchUser: (state, action) => {
      state.users = state.users.filter(e => e.name === action.payload || e.email === action.payload);
    },
    addMsg: (state, action) => {
      const res = async () => {
        await axios.post("http://127.0.0.1:4000/SendMsg",action.payload);
      }
      res()
    },
    refuseInvitation: (state, action) => {
      const res = async () => {
        const id = action.payload;
        await axios.delete("http://127.0.0.1:4000/refuseInvitation", { data: { id } });
      };
      res();
      state.invitations = state.invitations.filter(e => e._id != action.payload )
    },
    sendInvitation: (state, action) => {
      const res = async () => {
        await axios.post("http://127.0.0.1:4000/Invit", action.payload);
      };
      res();
    },
    acceptInvitation: (state, action) => {
      const res = async () => {
        try {
          await axios.put("http://localhost:4000/acceptInvit", action.payload);
          // If the API call is successful, update state
          state.invitations = state.invitations.filter(e => e._id !== action.payload.id);
        } catch (error) {
          console.error("Error accepting invitation:", error);
          // Handle error or notify the user
        }
      };
      res();
    },
    setResption : (state,action) => {
      state.reception = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getMsg.fulfilled, (state, action) => {
        state.chatContent = action.payload;
      })
      .addCase(getInvitations.fulfilled, (state, action) => {
        state.invitations = action.payload;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
      });
  },
});

export const { setUser, searchUser, addMsg,setResption,refuseInvitation,sendInvitation,acceptInvitation } = chatSlice.actions;
export default chatSlice.reducer;

