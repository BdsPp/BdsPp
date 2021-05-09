#include <napi.h>
#include <vector>

namespace core {
    std::vector<int> packetHandler(int Id, Napi::Array packet) {
        std::vector<int> out;
        if (Id == 0x02) {
        }
        else {
            return out;
        }
    }

    Napi::Value PacketMethod(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();
        int Id = info[0].As<Napi::Number>().Int32Value();
        Napi::Array Packet = info[1].As<Napi::Array>();

        std::vector<int> out = packetHandler(Id, Packet);

        Napi::Array outArr = Napi::Array::New(env, out.size());
        for (size_t i = 0; i < out.size(); i++) {
            outArr[i] = Napi::Number::New(env, out[i]);
        }
        return outArr;
    }

    Napi::Object Initialize(Napi::Env env, Napi::Object exports)
    {
        exports.Set(Napi::String::New(env, "packet"),
            Napi::Function::New(env, PacketMethod));
        return exports;
    }

    NODE_API_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}
