k to work on both old and new node)
 - Introduce NanMakeCallback for node::MakeCallback
 - Introduce NanSetTemplate
 - Introduce NanGetCurrentContext
 - Introduce NanCompileScript and NanRunScript
 - Introduce NanAdjustExternalMemory
 - Introduce NanAddGCEpilogueCallback, NanAddGCPrologueCallback, NanRemoveGCEpilogueCallback, NanRemoveGCPrologueCallback
 - Introduce NanGetHeapStatistics
 - Rename NanAsyncWorker#SavePersistent() to SaveToPersistent()

### 0.8.0 Jan 9 2014

 - NanDispose -> NanDisposePersistent, deprecate NanDispose
 - Extract _NAN_*_RETURN_TYPE, pull up NAN_*()

### 0.7.1 Jan 9 2014

 - Fixes to work against debug builds of Node
 - Safer NanPersistentToLocal (avoid reinterpret_cast)
 - Speed up common NanRawString case by only extracting flattened string when necessary

### 0.7.0 Dec 17 2013

 - New no-arg form of NanCallback() constructor.
 - NanCallback#Call takes Handle rather than Local
 - Removed deprecated NanCallback#Run method, use NanCallback#Call instead
 - Split off _NAN_*_ARGS_TYPE from _NAN_*_ARGS
 - Restore (unofficial) Node 0.6 compatibility at NanCallback#Call()
 - Introduce NanRawString() for char* (or appropriate void*) from v8::String
     (replacement for NanFromV8String)
 - Introduce NanCString() for null-terminated char* from v8::String

### 0.6.0 Nov 21 2013

 - Introduce NanNewLocal<T>(v8::Handle<T> value) for use in place of
     v8::Local<T>::New(...) since v8 started requiring isolate in Node 0.11.9

### 0.5.2 Nov 16 2013

 - Convert SavePersistent and GetFromPersistent in NanAsyncWorker from protected and public

### 0.5.1 Nov 12 2013

 - Use node::MakeCallback() instead of direct v8::Function::Call()

### 0.5.0 Nov 11 2013

 - Added @TooTallNate as collaborator
 - New, much simpler, "include_dirs" for binding.gyp
 - Added full range of NAN_INDEX_* macros to match NAN_PROPERTY_* macros

### 0.4.4 Nov 2 2013

 - Isolate argument from v8::Persistent::MakeWeak removed for 0.11.8+

### 0.4.3 Nov 2 2013

 - Include node_object_wrap.h, removed from node.h for Node 0.11.8.

### 0.4.2 Nov 2 2013

 - Handle deprecation of v8::Persistent::Dispose(v8::Isolate* isolate)) for
     Node 0.11.8 release.

### 0.4.1 Sep 16 2013

 - Added explicit `#include <uv.h>` as it was removed from node.h for v0.11.8

### 0.4.0 Sep 2 2013

 - Added NAN_INLINE and NAN_DEPRECATED and made use of them
 - Added NanError, NanTypeError and NanRangeError
 - Cleaned up code

### 0.3.2 Aug 30 2013

 - Fix missing scope declaration in GetFromPersistent() and SaveToPersistent
     in NanAsyncWorker

### 0.3.1 Aug 20 2013

 - fix "not all control paths return a value" compile warning on some platforms

### 0.3.0 Aug 19 2013

 - Made NAN work with NPM
 - Lots of fixes to NanFromV8String, pulling in features from new Node core
 - Changed node::encoding to Nan::Encoding in NanFromV8String to unify the API
 - Added optional error number argument for NanThrowError()
 - Added NanInitPersistent()
 - Added NanReturnNull() and NanReturnEmptyString()
 - Added NanLocker and NanUnlocker
 - Added missing scopes
 - Made sure to clear disposed Persistent handles
 - Changed NanAsyncWorker to allocate error messages on the heap
 - Changed NanThrowError(Local<Value>) to NanThrowError(Handle<Value>)
 - Fixed leak in NanAsyncWorker when errmsg is used

### 0.2.2 Aug 5 2013

 - Fixed usage of undefined variable with node::BASE64 in NanFromV8String()

### 0.2.1 Aug 5 2013

 - Fixed 0.8 breakage, node::BUFFER encoding type not available in 0.8 for
     NanFromV8String()

### 0.2.0 Aug 5 2013

 - Added NAN_PROPERTY_GETTER, NAN_PROPERTY_SETTER, NAN_PROPERTY_ENUMERATOR,
     NAN_PROPERTY_DELETER, NAN_PROPERTY_QUERY
 - Extracted _NAN_METHOD_ARGS, _NAN_GETTER_ARGS, _NAN_SETTER_ARGS,
     _NAN_PROPERTY_GETTER_ARGS, _NAN_PROPERTY_SETTER_ARGS,
     _NAN_PROPERTY_ENUMERATOR_ARGS, _NAN_PROPERTY_DELETER_ARGS,
     _NAN_PROPERTY_QUERY_ARGS
 - Added NanGetInternalFieldPointer, NanSetInternalFieldPointer
 - Added NAN_WEAK_CALLBACK, NAN_WEAK_CALLBACK_OBJECT,
     NAN_WEAK_CALLBACK_DATA, NanMakeWeak
 - Renamed THROW_ERROR to _NAN_THROW_ERROR
 - Added NanNewBufferHandle(char*, size_t, node::smalloc::FreeCallback, void*)
 - Added NanBufferUse(char*, uint32_t)
 - Added NanNewContextHandle(v8::ExtensionConfiguration*,
       v8::Handle<v8::ObjectTemplate>, v8::Handle<v8::Value>)
 - Fixed broken NanCallback#GetFunction()
 - Added optional encoding and size arguments to NanFromV8String()
 - Added NanGetPointerSafe() and NanSetPointerSafe()
 - Added initial test suite (to be expanded)
 - Allow NanUInt32OptionValue to convert any Number object

### 0.1.0 Jul 21 2013

 - Added `NAN_GETTER`, `NAN_SETTER`
 - Added `NanThrowError` with single Local<Value> argument
 - Added `NanNewBufferHandle` with single uint32_t argument
 - Added `NanHasInstance(Persistent<FunctionTemplate>&, Handle<Value>)`
 - Added `Local<Function> NanCallback#GetFunction()`
 - Added `NanCallback#Call(int, Local<Value>[])`
 - Deprecated `NanCallback#Run(int, Local<Value>[])` in favour of Call
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              /*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

package org.apache.cordova;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import android.content.Context;

public class ConfigXmlParser {
    private static String TAG = "ConfigXmlParser";

    private String launchUrl = "file:///android_asset/www/index.html";
    private CordovaPreferences prefs = new CordovaPreferences();
    private ArrayList<PluginEntry> pluginEntries = new ArrayList<PluginEntry>(20);

    public CordovaPreferences getPreferences() {
        return prefs;
    }

    public ArrayList<PluginEntry> getPluginEntries() {
        return pluginEntries;
    }

    public String getLaunchUrl() {
        return launchUrl;
    }

    public void parse(Context action) {
        // First checking the class namespace for config.xml
        int id = action.getResources().getIdentifier("config", "xml", action.getClass().getPackage().getName());
        if (id == 0) {
            // If we couldn't find config.xml there, we'll look in the namespace from AndroidManifest.xml
            id = action.getResources().getIdentifier("config", "xml", action.getPackageName());
            if (id == 0) {
                LOG.e(TAG, "res/xml/config.xml is missing!");
                return;
            }
        }
        parse(action.getResources().getXml(id));
    }

    boolean insideFeature = false;
    String service = "", pluginClass = "", paramType = "";
    boolean onload = false;

    public void parse(XmlPullParser xml) {
        int eventType = -1;

        while (eventType != XmlPullParser.END_DOCUMENT) {
            if (eventType == XmlPullParser.START_TAG) {
                handleStartTag(xml);
            }
            else if (eventType == XmlPullParser.END_TAG)
            {
                handleEndTag(xml);
            }
            try {
                eventType = xml.next();
            } catch (XmlPullParserException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void handleStartTag(XmlPullParser xml) {
        String strNode = xml.getName();
        if (strNode.equals("feature")) {
            //Check for supported feature sets  aka. plugins (Accelerometer, Geolocation, etc)
            //Set the bit for reading params
            insideFeature = true;
            service = xml.getAttributeValue(null, "name");
        }
        else if (insideFeature && strNode.equals("param")) {
            paramType = xml.getAttributeValue(null, "name");
            if (paramType.equals("service")) // check if it is using the older service param
                service = xml.getAttributeValue(null, "value");
            else if (paramType.equals("package") || paramType.equals("android-package"))
                pluginClass = xml.getAttributeValue(null,"value");
            else if (paramType.equals("onload"))
                onload = "true".equals(xml.getAttributeValue(null, "value"));
        }
        else if (strNode.equals("preference")) {
            String name = xml.getAttributeValue(null, "name").toLowerCase(Locale.ENGLISH);
            String value = xml.getAttributeValue(null, "value");
            prefs.set(name, value);
        }
        else if (strNode.equals("content")) {
            String src = xml.getAttributeValue(null, "src");
            if (src != null) {
                setStartUrl(src);
            }
        }
    }

    public void handleEndTag(XmlPullParser xml) {
        String strNode = xml.getName();
        if (strNode.equals("feature")) {
            pluginEntries.add(new PluginEntry(service, pluginClass, onload));

            service = "";
            pluginClass = "";
            insideFeature = false;
            onload = false;
        }
    }

    private void setStartUrl(String src) {
        Pattern schemeRegex = Pattern.compile("^[a-z-]+://");
        Matcher matcher = schemeRegex.matcher(src);
        if (matcher.find()) {
            launchUrl = src;
        } else {
            if (src.charAt(0) == '/') {
                src = src.substring(1);
            }
            launchUrl = "file:///android_asset/www/" + src;
        }
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        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