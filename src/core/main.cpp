#include <napi.h>
#include <vector>


namespace core {

    Napi::Value PacketMethod(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();
        Napi::Array Packet = info[0].As<Napi::Array>();

        int elem = 0;
        Napi::Value val = Packet[elem];
        int f = val.As<Napi::Number>().Int32Value();
        return Napi::Number::New(env, f);
    }

    Napi::Object Initialize(Napi::Env env, Napi::Object exports)
    {
        exports.Set(Napi::String::New(env, "packet"),
            Napi::Function::New(env, PacketMethod));
        return exports;
    }

    NODE_API_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}
