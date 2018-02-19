import * as ToText from './speech';
import * as TextAnalyser from './text';
import * as ToSpeech from './gif';

export function(req, res, lang='en') {

  var src_txt = ToText.Transcribe(req.speech);

  var src_analysis = TextAnalyser.Analysis(src_txt, src_lang);

  var gifResponse = ToSpeech.makeGif(src_txt, src_lang, src_analysis);

  return gifResponse;
}

export function(req, res, src_lang='en', trgt_lang='en') {

  var src_txt = ToText.Transcribe(req.speech);
  var src_lang = TextAnalyser.Detect(src_txt);

  var trgt_txt = TextAnalyser.Translate(src_txt, src_lang, trgt_lang);
  var trgt_analysis = TextAnalyser.Analysis(trgt_txt, trgt_lang);

  var gifResponse = ToSpeech.makeGif(trgt_txt, trgt_lang, src_analysis);
}
